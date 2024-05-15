import { computed, onMounted, ref } from "vue"

import { useStorage } from "../storage"
import { useNotifications } from "./handler"

export interface SubscriptionOptions {
    subscribeUrl: string
    publicKey: string
}

function useDeviceId () {
    const idKey = 'device-notifications-push-id'
    const storage = useStorage()

    const id = storage.useKey<string>(idKey, null, { writeDefaults: false })
    if (!id.value) id.value = crypto.randomUUID()

    return id
}

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export function useNotificationSubscription<Data = unknown> (options: SubscriptionOptions) {
    const id = useDeviceId()
    const { worker } = useNotifications()

    const webSubscription = ref<PushSubscriptionJSON>()
    const subscriptionData = ref<Data>()

    const pushManager = worker.value?.pushManager

    const fetchData = async (method: string, includeId: boolean, body: string | null = null) => {
        return await fetch(options.subscribeUrl + (includeId ? `?id=${id.value}` : ''), {
            method,
            body,
        })
    }

    const webSubcribe = async () => {
        const subscription = await worker.value?.pushManager?.subscribe({ applicationServerKey: urlBase64ToUint8Array(options.publicKey), userVisibleOnly: true })
        console.log([subscription, options.publicKey])
        if (subscription) webSubscription.value = subscription.toJSON()

        return subscription
    }
    const webUnsubscribe = async () => await pushManager?.getSubscription()
        .then(async sub => (await sub?.unsubscribe()) ?? false)
        ?? false

    const settingsData = {
        subscribe: async (options: Data) => {
            if (!webSubscription.value || !id.value) throw new Error()

            const data = await fetchData('POST', false, JSON.stringify({
                subscription: webSubscription.value,
                deviceId: id.value,
                data: options,
            })).then(res => res.ok ? res.json() : undefined)

            if (data) subscriptionData.value = data
            return data
        },
        update: async (options: Partial<Data>) => {
            return await fetchData('PATCH', true, JSON.stringify({
                deviceId: id.value,
                data: options,
            })).then(res => res.ok)
        },
        get: async () => await fetchData('GET', true)
            .then(res => res.ok ? res.json() : undefined),
        unsubscribe: async () => {
            return await fetchData('DELETE', true)
                .then(res => res.ok)
        }
    }

    const fetchAll = async () => {
        const data = await fetchData('GET', true)
            .then(res => res.ok ? res.json() : undefined)
        if (data) subscriptionData.value = data

        const sub = await worker.value?.pushManager?.getSubscription()
            .then(s => s?.toJSON())
        if (sub) webSubscription.value = sub
    }

    const isNotSubscribed = computed(() => webSubscription.value == undefined && subscriptionData.value == undefined)
    const validOptions = computed(() => typeof options.publicKey === 'string' && typeof options.subscribeUrl === 'string')
    onMounted(async () => {
        if (validOptions.value) await fetchAll()
    })

    return {
        id,
        validOptions,
        isNotSubscribed,
        web: {
            data: webSubscription,
            subscribe: async () => await webSubcribe(),
            unsubscribe: async () => await webUnsubscribe(),
        },
        settings: {
            data: subscriptionData,
            subscribe: settingsData.subscribe,
            unsubscribe: settingsData.unsubscribe,
            update: settingsData.update,
        },
        data: {
            subscription: webSubscription,
            settings: subscriptionData,
        },
        fetch: fetchAll,
        subscribe: async (options: Data) => {
            const p1 = await webSubcribe()
            const p2 = await settingsData.subscribe(options)

            return p1 && p2
        },
        unsubsribe: async () => {
            const p1 = await webUnsubscribe()
            const p2 = await settingsData.unsubscribe()

            return p1 && p2
        },
    }
}
