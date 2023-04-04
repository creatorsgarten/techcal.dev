<script lang="ts">
  import Day from './day.svelte'

  import { getEvents } from '../../../functions/getEvents'

  import type { Dayjs } from 'dayjs'
  import type { GoogleCalendarItem } from '../../../@types/GoogleCalendar'

  export let calendarDays: Dayjs[]
  export let firstDayOfThisMonth: Dayjs
  export let today: Dayjs
  export let items: GoogleCalendarItem[]
</script>

<header class="col-span-7 grid grid-cols-7 text-center py-1">
  <p>Sun</p>
  <p>Mon</p>
  <p>Tue</p>
  <p>Wed</p>
  <p>Thu</p>
  <p>Fri</p>
  <p>Sat</p>
</header>
<section class="relative mt-4">
  <div
    class="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
  />
  <div
    class="grid grid-cols-7 border rounded-xl overflow-hidden bg-white dark:bg-neutral-800 dark:border-neutral-600 relative"
  >
    {#each calendarDays as calendarDay}
      <Day
        date={calendarDay}
        events={getEvents(items, calendarDay)}
        {today}
        {firstDayOfThisMonth}
      />
    {/each}
  </div>
</section>

<footer class="pt-10 pb-8 text-xs text-center">
  <p>Originally made by <a href="https://twitter.com/thangman22">@thangman22</a> · Redesigned by <a href="https://facebook.com/rayriffy">@rayriffy</a></p>
  <p>Maintained by <a href="https://creatorsgarten.org">Creatorsgarten</a></p>
</footer>
