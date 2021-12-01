const settingsType = {
  DARK_THEME: 0,
  PAGE_WATCHING_ENABLED: 1,
  PAGE_OVERVIEW_ENABLED: 2,
  WIP_PAGES: 3,
}

// Default settings
// TODO: add configuration to theme options
// TODO: convert to id to settingsType
const settings = [
  {
    text: 'Dark theme',
    id: 'settingsAppDarkTheme',
  },
  {
    text: 'Hide page overview',
    id: 'settingsAppOverview'
  }
]

const options = [
  {
    name: 'Notifications',
    icon: 'bell'
  },
  {
    name: 'Help and feedback',
    icon: 'bug'
  },
  {
    name: 'Advanced',
    icon: 'flask'
  }
]

module.exports = {
  settings,
  options,
  settingsType
}