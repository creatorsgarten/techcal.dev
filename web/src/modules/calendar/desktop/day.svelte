<script lang="ts">
  import Event from '../../event/index.svelte'

  import type { Dayjs } from 'dayjs'
  import type { GoogleCalendarItem } from '$types/GoogleCalendar'
  import { captureMode } from '$context/captureMode'
  import DayJS from '$functions/dayjs.svelte'

  export let date: Dayjs
  export let firstDayOfThisMonth: Dayjs
  export let today: Dayjs
  export let events: GoogleCalendarItem[]

  $: diffFromToday = Math.floor(date.diff(today, 'day', true))
  $: isInCurrentMonth = date.month() === firstDayOfThisMonth.month()
  $: isWeekend = date.day() === 0 || date.day() === 6
</script>

<div
  class={`aspect-[3/2] p-2 border dark:border-neutral-600 h-full w-full ${
    isWeekend ? 'bg-gray-100 dark:bg-neutral-800' : ''
  } select-none`}
>
  <p
    class={`${
      isInCurrentMonth
        ? 'text-gray-950 dark:text-white'
        : 'text-gray-400 dark:text-neutral-500'
    } text-right text-sm`}
  >
    {#if date.date() === 1}
      <span class="font-semibold py-0.5"><DayJS {date} format={'MMMM'} /></span>
    {/if}
    <span
      class={diffFromToday === 0 && !$captureMode
        ? 'bg-orange-600 text-white px-2 rounded-md py-0.5'
        : 'py-0.5'}>{date.date()}</span
    >
  </p>
  <div class="pt-1 space-y-1">
    {#each events as item}
      <Event {item} dayDiff={diffFromToday} />
    {/each}
  </div>
</div>
