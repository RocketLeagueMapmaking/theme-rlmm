import { onMounted, ref } from "vue"

import { useStorage } from "../storage"
import { useNotifications } from "./handler"

export interface SubscriptionOptions {
    subscribeUrl: string
    publicKey: string
}

// type SubscriptionData =
//     | { type: 'page-update', pages: WatchedPages }

// type UserSubscriptionData = Record<
//     SubscriptionData['type'],
//     Omit<SubscriptionData, 'type'>
// >

function useDeviceId () {
    const idKey = 'device-notifications-push-id'
    const storage = useStorage()

    const id = storage.useKey<string>(idKey, <never>crypto.randomUUID())

    return id
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
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    const webSubcribe = async () => {
        const subscription = await pushManager?.subscribe({ applicationServerKey: options.publicKey, userVisibleOnly: true })
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
                subcription: webSubscription.value,
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

        const sub = await pushManager?.getSubscription()
            .then(s => s?.toJSON())
        if (sub) webSubscription.value = sub
    }

    onMounted(async () => await fetchAll())

    return {
        id,
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
            await webSubcribe()
            return await settingsData.subscribe(options)
        },
        unsubsribe: async () => {
            const p1 = await webUnsubscribe()
            const p2 = await settingsData.unsubscribe()

            return p1 && p2
        },
    }
}
