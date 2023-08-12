<script lang="ts">
  import type { IconifyIcon as IconDefinition } from 'iconify-icon'
  export let icon: string | IconDefinition

  $: iconString = typeof icon === 'string' ? icon : JSON.stringify(icon)
</script>

<iconify-icon icon={iconString} {...$$restProps} />
