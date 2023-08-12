<script lang="ts">
  import IconifyIcon from '$modules/icons/iconifyIcon.svelte'
  import { extractMagicHashtags } from '$modules/magicHashtags'
  import type { GoogleCalendarItem } from '$types/GoogleCalendar'

  interface IconInfo {
    icon: string
    title: string
  }

  export let item: GoogleCalendarItem

  $: icons = (() => {
    const out: IconInfo[] = []
    const hashtags = new Set(
      extractMagicHashtags(item.description || '').matchedHashtags
    )

    if (hashtags.has('online')) {
      out.push({
        icon: 'material-symbols:live-tv-outline',
        title: '#online - Online event',
      })
    } else if (hashtags.has('live')) {
      out.push({
        icon: 'ri:live-line',
        title: '#live - Live video available',
      })
    } else if (hashtags.has('english')) {
      out.push({
        icon: 'ant-design:global-outlined',
        title: '#english - English language',
      })
    }
    return out
  })()
</script>

{#if icons.length}
  {#each icons as icon}
    <span title={icon.title}><IconifyIcon icon={icon.icon} inline /></span>{' '}
  {/each}
{/if}
