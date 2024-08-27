Component to show or allow to set a value that gets stored in the local storage of the current browser.

The default slot is the text associated with the action. Use the `storeKey` property to decide which local storage key the value will get and `defaultValue` to set the current value if nothing has been set yet.

### Setting types

The allowed `type`s are:

* `'switch'`: toggle for boolean values
* `'input'`: input field for string values
* `'select'`: select field for string array values
* `'color'`: color pick

```ts
<PreferenceSetting storeKey="rlmm-path-udk" defaultValue="C:\UDK\RLMM\" type="input">
    UDK Installation folder
</PreferenceSetting>
```

> [!TIP] Get settings value
> To get a setting value in a component, use the [`useSettings`](/theme/composables#usesettings) function

### Show value

Showing a value is handled with `renderValue` property set to `true`. You don't need to set the default slot when showing the value.

:::details Example

```ts
<PreferenceSetting :renderValue="true" storeKey="rlmm-path-udk" defaultValue="C:\UDK\RLMM\" type="input" />
```

<PreferenceSetting :renderValue="true" storeKey="rlmm-path-udk" defaultValue="C:\UDK\RLMM\" type="input" />
<PreferenceSetting storeKey="rlmm-path-udk" defaultValue="C:\UDK\RLMM\" type="input">

Your UDK folder
</PreferenceSetting>

:::
