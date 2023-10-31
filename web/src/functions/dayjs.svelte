<script lang="ts">
  import dayjs from 'dayjs'
  import type { Dayjs } from 'dayjs'
  import { localeAtom } from './localeManager'

  export let date: Date | Dayjs
  export let format: string

  $: formattedDate = dayjs(date).locale($localeAtom).format(format)
</script>

{formattedDate}
