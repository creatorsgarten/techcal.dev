<script lang="ts">
  import Day from './day.svelte'

  import { getEvents } from '$functions/getEvents'

  import type { Dayjs } from 'dayjs'
  import type { GoogleCalendarItem } from '$types/GoogleCalendar'

  export let calendarDays: Dayjs[]
  export let firstDayOfThisMonth: Dayjs
  export let today: Dayjs

  $: renderedCalendarDays = calendarDays.filter(
    o => o.month() === firstDayOfThisMonth.month()
  )

  let scrollerEl: HTMLDivElement

  $: {
    if (scrollerEl) {
      if (today.month() === firstDayOfThisMonth.month()) {
        scrollerEl.scrollLeft =
          (scrollerEl.scrollWidth / renderedCalendarDays.length) *
          (today.date() - 1)
      } else {
        scrollerEl.scrollLeft = 0
      }
    }
  }

  // prettier-ignore
  export let items: GoogleCalendarItem[];
</script>

<div
  class="snap-x flex overflow-x-auto h-full divide-x dark:divide-neutral-600 pt-1"
  bind:this={scrollerEl}
>
  {#each renderedCalendarDays as calendarDay}
    <Day date={calendarDay} events={getEvents(items, calendarDay)} {today} />
  {/each}
</div>
