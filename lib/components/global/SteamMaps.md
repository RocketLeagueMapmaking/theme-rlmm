Shows the most recent published / updated maps on the Rocket League Steam workshop.

> [!TIP] Colored title
> The `title` option renders as HTML making it customisable to style. By default any `span` element in the title will be the brand color.

```ts
type AddSteamMapsAction = (map: SteamMap) => { text: string, link: string }[]
type SteamDownloadUrlTemplate = string | (id: string) => string
```

> [!INFO] Hide on home page
> The `hideHomeSteamMaps` local storage option for the key will allow to hide the Steam maps component to be hidden on the home page if the steam maps are enabled by default. Otherwise the storage option will allow to show the Steam maps component.

### Url protocol

The local storage key option for `hideHomeSteamMaps` is used to read the user settings

Available options:

* `'setting-windows'`: if on Windows and the setting is enabled, open urls in the Steam app
* `'setting'`: if the setting is enabled, always open urls in the Steam app
* `'app-windows'`: if on Windows, open urls in the Steam app
* `'app'`: always open urls in the Steam app
* `'browser'`: always open urls in the internet browser

### Click action

Use the `disableClick` option to disable going to the next map by clicking on the current map.
This will open the map on clicking using the [url protocol](#url-protocol).

### Title switcher

### Examples

```md
<!-- Shows only the most recent map -->
<SteamMaps :amount="1" :displayTime="-1" :disableClick="true"/>
```

```md
<SteamMaps />
```

<SteamMaps containerStyle="width: fit-content; margin: 0 auto;" />
<!--  -->
