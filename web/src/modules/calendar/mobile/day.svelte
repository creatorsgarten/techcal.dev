<script lang="ts">
  import Event from '../../event/index.svelte'

  import { getEvents } from '$functions/getEvents'
  import DayJS from '$functions/dayjs.svelte'

  import type { Dayjs } from 'dayjs'
  import type { GoogleCalendarItem } from '$types/GoogleCalendar'

  export let date: Dayjs
  export let today: Dayjs
  export let events: GoogleCalendarItem[]

  $: diffFromToday = Math.floor(date.diff(today, 'day', true))
  $: isWeekend = date.day() === 0 || date.day() === 6
</script>

<div
  class={`snap-center w-1/3 shrink-0 h-full ${
    isWeekend ? 'bg-gray-50' : 'bg-white'
  } dark:bg-neutral-800`}
>
  <div
    class={`py-2 text-center bg-gray-50 dark:bg-neutral-900 text-xs border-b space-x-1 ${
      diffFromToday === 0
        ? 'text-gray-950 dark:text-white'
        : 'text-gray-400 dark:text-neutral-400'
    }`}
  >
    <span><DayJS {date} format="ddd" /></span>
    <span
      class={`${
        diffFromToday === 0
          ? 'bg-orange-600 text-white rounded-md px-2 py-1'
          : ''
      }`}><DayJS {date} format="D" /></span
    >
  </div>
  <div class="space-y-2 py-2 px-1">
    {#each getEvents(events, date) as item}
      <Event {item} dayDiff={diffFromToday} />
    {/each}
  </div>
</div>
