import { ref, onMounted } from "vue"
import { useWebNotification } from "@vueuse/core"
import { type BaseNotification, ThemeNotificationContext } from "../../types"

interface ThemeNotificationFilterOptions {
    inbox?: boolean
    sort?: boolean
    active?: boolean

    max?: number
}

class ThemeNotifications {
    public static isActive (notification: BaseNotification) {
        const now = Date.now()
        const { begin, end } = notification.time ?? {}

        const active = (typeof begin === 'number' ? begin < now : true)
            && (typeof end === 'number' ? end > now : true)

        if (!active) console.debug(`Not showing ${notification.id} because the time configured is invalid for the current time: ${now}`)
        if (!this.isAllowedContext(notification)) {
            console.debug('Not allowed to show notification because of invalid contexts: ', [notification.id, notification.contexts])
            return false
        }

        return active
    }

    public static filter <T extends BaseNotification>(notifications: T[], options: ThemeNotificationFilterOptions): T[] {
        const filtered = notifications
            .filter(n => (options.inbox ? n['inbox'] === true : true) && (options.active ? this.isActive(n) : this.isAllowedContext(n)))
            .slice(0, options?.max ?? notifications.length)
        
        return options.sort 
            ? filtered.sort((a, b) => this.getStartTime(b) - this.getStartTime(a))
            : filtered
    }

    public static isAllowedContext (notification: BaseNotification) {
        const contexts = notification.contexts ?? []
        if (contexts.length === 0) return true
        if (!location) {
            console.debug('Unable to check for location')
            return false
        }

        const host = location.hostname, port = location.port
        const isLocal = ['localhost', '0.0.0.0'].includes(host)

        const commitIdRegex = /(?!\d{8}|[a-f]{8})[a-f\d]{8}/
        const startsWithCommitId = host.split('.')[0].match(commitIdRegex) != null

        console.debug('Checking contexts for notification', { local: isLocal, commit_id: startsWithCommitId, host, port })

        return contexts.some(context => {
            switch (context) {
                case ThemeNotificationContext.LocalDev:
                    // Should be around 5173
                    return isLocal && parseInt(port) > 5000
                case ThemeNotificationContext.LocalPreview:
                    // Should be around 4173
                    return isLocal && parseInt(port) < 5000
                case ThemeNotificationContext.Production:
                    // Only pages.dev options are after this context
                    return !host.endsWith('pages.dev')
                case ThemeNotificationContext.PagesDev:
                    // Should be [projectname, pages, dev]
                    return host.split('.').length === 3
                case ThemeNotificationContext.PagesDevCommit:
                    // Subdomain should be a commit id
                    return host.endsWith('pages.dev') && startsWithCommitId
                case ThemeNotificationContext.PagesDevBranch:
                    return host.endsWith('pages.dev') && !startsWithCommitId
            }
        })
        
    }

    public static isUnread (notification: BaseNotification, lastReadTime: number): boolean {
        return this.isActive(notification) && this.getStartTime(notification) > lastReadTime
    }

    public static getStartTime (notification: BaseNotification): number {
        return notification.time?.begin ?? notification.created_at
    }
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
            return ThemeNotifications.isActive(notification)
        },
        getStartTime (notification: BaseNotification) {
            return ThemeNotifications.getStartTime(notification)
        },
        isUnread (notification: BaseNotification, lastReadTime: number) {
            return ThemeNotifications.isUnread(notification, lastReadTime)
        },
        filter <T extends BaseNotification>(notifications: T[], options: ThemeNotificationFilterOptions) {
            return ThemeNotifications.filter<T>(notifications, options)
        }
    } satisfies ThemeNotifications
}