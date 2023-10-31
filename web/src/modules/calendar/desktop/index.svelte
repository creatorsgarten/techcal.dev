<script lang="ts">
  import Day from './day.svelte'
  import DayJS from '$functions/dayjs.svelte'

  import { getEvents } from '$functions/getEvents'

  import type { Dayjs } from 'dayjs'
  import type { GoogleCalendarItem } from '$types/GoogleCalendar'
  import { captureMode } from '$context/captureMode'
  import IconifyIcon from '$modules/icons/iconifyIcon.svelte'
  import dayjs from 'dayjs'

  export let calendarDays: Dayjs[]
  export let firstDayOfThisMonth: Dayjs
  export let today: Dayjs
  // prettier-ignore
  export let items: GoogleCalendarItem[];
</script>

<header class="col-span-7 grid grid-cols-7 text-center py-1 mt-2">
  {#each Array(7) as _, i}
    <p><DayJS date={dayjs().day(i)} format="ddd" /></p>
  {/each}
</header>
<section class="relative mt-4 group">
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
        bind:today
        bind:firstDayOfThisMonth
      />
    {/each}
  </div>
</section>

{#if !$captureMode}
  <footer class="pt-10 pb-8 text-xs text-center">
    <p class="text-neutral-500 dark:text-neutral-400">
      Originally made by <a href="https://twitter.com/thangman22">@thangman22</a
      >
      · Redesigned by <a href="https://facebook.com/rayriffy">@rayriffy</a>
      · Maintained by <a href="https://creatorsgarten.org">Creatorsgarten</a>
    </p>
    <p class="mt-3 text-3xl flex flex-wrap gap-3 justify-center">
      <a
        href="https://calendar.google.com/calendar/u/0/r?cid=tech.cal.th@gmail.com"
        target="_blank"
        title="Add to Google Calendar"
      >
        <IconifyIcon icon="logos:google-calendar" />
      </a>
      <a
        href="https://www.facebook.com/th.techcal.dev"
        target="_blank"
        title="Facebook page"
      >
        <IconifyIcon icon="logos:facebook" />
      </a>
      <a
        href="https://github.com/creatorsgarten/techcal.dev"
        target="_blank"
        title="Source code on GitHub"
        class="text-[#161614] dark:text-[#f0f0f0]"
      >
        <IconifyIcon icon="bi:github" />
      </a>
    </p>
  </footer>
{/if}
