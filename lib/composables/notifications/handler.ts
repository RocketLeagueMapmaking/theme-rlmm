import { ref, onMounted } from "vue"
import { useWebNotification } from "@vueuse/core"
import { BaseNotification } from "../../types"

class NotificationUtil<N extends BaseNotification> {
    public constructor (
        public notification: N,
    ) {}

    public get startTime (): number {
        return this.notification.time?.begin ?? this.notification.created_at
    }

    public get isActive (): boolean {
        const now = Date.now()
        const { begin, end } = this.notification.time ?? {}

        return (typeof begin === 'number' ? begin < now : true)
            && (typeof end === 'number' ? end > now : true)
    }
}

export function useNotification <N extends BaseNotification>(notification: N) {
    return new NotificationUtil<N>(notification)
}

export function useNotifications () {
    const { ensurePermissions, isSupported, permissionGranted } = useWebNotification({
        requestPermissions: false,
    })

    const worker = ref<ServiceWorkerRegistration>()

    onMounted(async () => {
        worker.value = await window.navigator.serviceWorker.ready
    })

    const requestPermissions = async () => {
        if (!isSupported.value) return

        return await Notification.requestPermission()
    }

    return {
        worker,
        enabled: isSupported,
        permissions: {
            granted: permissionGranted,
            ensure: ensurePermissions,
            request: requestPermissions,
        },
        isActive (notification: BaseNotification) {
            const now = Date.now()
            const { begin, end } = notification.time ?? {}

            const active = (typeof begin === 'number' ? begin < now : true)
                && (typeof end === 'number' ? end > now : true)

            if (!active) console.debug(`Not showing ${notification.id} because the time configured is invalid for the current time: ${now}`)
            return active
        },
        getStartTime (notification: BaseNotification) {
            return notification.time?.begin ?? notification.created_at
        },
    }
}