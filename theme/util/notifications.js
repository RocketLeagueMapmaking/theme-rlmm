const applicationServerKey = ''

/**
 * Check if notifications are supported
 * @returns {boolean}
 */
function canShowNotifications() {
        // Service Worker isn't supported on this browser, disable or hide UI.
    return ('serviceWorker' in navigator) 
        // Push isn't supported on this browser, disable or hide UI.
        && ('PushManager' in window)
}

async function askPermission() {
    return new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    }).then(function (permissionResult) {
        if (permissionResult !== 'granted') {
            throw new Error("We weren't granted permission.");
        }
    });
}

/**
 * Subscribe the current to user to push notifications.
 * Assumes that the service worker is active.
 * @param {string} applicationServerKey 
 * @returns the created push subscription
 */
async function subscribeUserToPush (applicationServerKey) {
    return navigator.serviceWorker.getRegistration()
      .then(registration => {
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(applicationServerKey),
        };
  
        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then(function (pushSubscription) {
        console.log(
          'Received PushSubscription: ',
          JSON.stringify(pushSubscription),
        );
        return pushSubscription;
      });
  }

/**
 * 
 * @param {SiteNotification} notification 
 * @param {string[]} pages 
 * @param {import('@vuepress/types').Page} $page 
 * @param {boolean} isDismissed 
 * @returns {boolean}
 */
function isNotificationBannerEnabled (notification, pages, $page, isDismissed) {
    // TODO: check again
    /**
     * Check a property for ???
     * @param {number | unknown[] | undefined} prop 
     * @param {boolean} check 
     * @returns 
     */
    const compareNeg = (prop, check) => (typeof prop === 'number' ? prop : (prop || { length: 0 }).length) > 0 ? check : true

    return compareNeg(notification.pages, pages.some(slug => $page.slug === slug))
        && compareNeg(notification.startDate, notification.startDate < Date.now())
        && compareNeg(notification.endDate, notification.endDate > Date.now())
        && (notification.once ? !isDismissed : true)
}

module.exports = {
    canShow: canShowNotifications,
    isBannerEnabled: isNotificationBannerEnabled,
    subscribeUser: subscribeUserToPush,
    askPermission,
}