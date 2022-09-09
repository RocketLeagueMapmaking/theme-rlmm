// Default settings
// TODO: add configuration to theme options
const settings = [
  {
    text: 'Display theme',
    id: 'settingsAppDarkTheme',
    type: 'icon',
    getIcon (checked) {
      return `fa-solid:cloud-${checked ? 'moon' : 'sun'}`
    },
    setIcon (checked) {
      this.icon = this.getIcon(checked)
    },
    icon: undefined
  },
  {
    text: 'Hide page overview',
    id: 'settingsAppOverview'
  }
]

const options = [
  {
    name: 'Changelog',
    icon: 'bullhorn',
    link: '/changelog'
  }
]

module.exports = {
  settings,
  options
}