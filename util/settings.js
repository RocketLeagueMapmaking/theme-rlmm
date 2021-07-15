const modals = [
  {
    title: 'Preferences',
    options: [
      {
        text: 'Dark theme',
        id: 'settingsAppDarkTheme',
      },
      {
        text: 'Expiremental features',
        id: 'settingsAppBeta'
      }
    ],
  },
  {
    title: 'Changelog',
    options: [
      {
        text: 'Hide changelog',
        id: 'settingsAppInbox'
      },
      {
        text: 'Watch all pages',
        id: 'settingsAppAllPages'
      }
    ]
  },
]

module.exports = {
  modals
}