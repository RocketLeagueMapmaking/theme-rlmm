import { onMounted, ref } from "vue"
import { useStorage, WatchedPages } from "./localStorage"

interface SubscriptionOptions {
    subscribeUrl: string
    publicKey: string
}

type SubscriptionData =
    | { type: 'page-update', pages: WatchedPages }

type UserSubscriptionData = Record<
    SubscriptionData['type'],
    Omit<SubscriptionData, 'type'>
>

class SubscriptionManager {
    public constructor (
        private options: SubscriptionOptions,
        private deviceId: string,
        private registration: ServiceWorkerRegistration,
    ) {}

    public async fetch () {
        return await this.registration.pushManager.getSubscription()
    }

    public async fetchData (): Promise<UserSubscriptionData | undefined> {
        return await fetch(this.options.subscribeUrl + `?id=${this.deviceId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.ok ? res.json() : undefined)
    }

    public async subscribe (data: SubscriptionData) {
        const subcription = await this.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: this.options.publicKey,
        })

        if (subcription) {
            await fetch(this.options.subscribeUrl, {
                method: 'POST',
                body: JSON.stringify({
                    subcription,
                    deviceId: this.deviceId,
                    data,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }
    }

    public async updateSubscription (data: SubscriptionData) {
        return await fetch(this.options.subscribeUrl + `?id=${this.deviceId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                deviceId: this.deviceId,
                data,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.ok)
    }

    public async unsubscribe () {
        const subcription = await this.fetch()

        const success = await subcription?.unsubscribe()
        if (!success) console.error('Failed to unsubscribe from notifications!')

        return await fetch(this.options.subscribeUrl + `?id=${this.deviceId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => res.ok)
    }
}

class NotificationsHandler {
    private setItem?: (key: string, value: string) => void
    private getItem?: (key: string) => string | null
    public getWatchedPages: () => WatchedPages = () => []

    public get enabled (): boolean {
        return window != undefined
            && 'navigator' in window 
            && window.navigator != undefined
            && "Notification" in window
            && 'PushManager' in window
            && 'serviceWorker' in window.navigator 
            && 'localStorage' in window
    }

    public constructor () {
        if (!this.enabled) {
            console.error('Missing one or more features to enable notifications!')
        } else {
            const storage = useStorage()
            this.getWatchedPages = () => storage.getWatchedPages()
            this.setItem = (key, value) => storage.set(key, value)
            this.getItem = (key) => storage.get(key)
        }
    }

    public async requestPermissions () {
        if (!this.enabled) {
            return console.log("This browser does not support notifications.");
        }

        await Notification.requestPermission()
    }

    public get hasPermission () {
        return this.enabled && Notification.permission === 'granted'
    }

    public async getWorker () {
        return this.enabled ? await window.navigator.serviceWorker.ready : undefined
    }

    private createDeviceId () {
        const idKey = 'device-notifications-push-id'
        if (!this.getItem || !this.setItem) return console.error('Unable to access local storage')

        const id: string | null = this.getItem(idKey)
            ?? crypto?.randomUUID()

        this.setItem(idKey, id)
        const storedId = this.getItem(idKey)

        if (!storedId) return console.error('Unable to access local storage or use crypto module')
        else return storedId
    }

    public async createSubscriptionHandler (options: SubscriptionOptions) {
        const worker = await this.getWorker()
        const id = this.createDeviceId()

        if (!id || !worker) return console.error('Unable to create subscriptions handler')

        return new SubscriptionManager(options, id, worker)
    }

    public async getNotifications (tag?: string) {
        return (await this.getWorker())
            ?.getNotifications({ tag })
    }

    public async showNotification (title: string, options?: NotificationOptions) {
        if (!this.hasPermission) return
        const sw = await this.getWorker()

        sw?.showNotification(title, options)
    }
}

export function useNotifications () {
    const handler = ref<NotificationsHandler | null>(null)

    onMounted(() => handler.value = new NotificationsHandler())

    return handler
}
