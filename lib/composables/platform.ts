import { onMounted, ref } from "vue";

// Combine `platform` and `userAgentData` since one is deprecated and one is experimental
export function usePlatform() {
    const platform = ref<string>('unknown')

    onMounted(() => {
        // Not in TS
        const data = (navigator as (typeof navigator & { userAgentData: { platform: string } })).userAgentData

        if (typeof data !== undefined && data != null) {
            platform.value = data.platform;
        }

        else if (typeof navigator.platform !== undefined) {
            platform.value = navigator.platform;
        }
    })

    return platform
}