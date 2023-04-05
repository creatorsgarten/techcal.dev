<script lang="ts">

  import type { Dayjs } from 'dayjs'

  import { getCalendarEvents } from '$functions/getCalendarEvents'

  import ChevronLeft from '../icons/chevronLeft.svelte'
  import ChevronRight from '../icons/chevronRight.svelte'
  import type { GoogleCalendarItem } from '$types/GoogleCalendar'

  export let onShift: (amount: number) => () => void

  export let firstDayOfThisMonth: Dayjs
  export let filterStart: Dayjs
  export let filterEnd: Dayjs

  let items: GoogleCalendarItem[] = []
  $:{
    getCalendarEvents(filterStart, filterEnd).then(o => {
      items = o
    }).catch(e => {})
  }
</script>

<div
  class="max-w-6xl mx-auto sm:px-8 h-full sm:h-auto overflow-hidden sm:overflow-visible"
>
  <div class="flex justify-between px-2">
    <h1 class="text-2xl sm:text-3xl pl-1 sm:pl-0">
      <span class="font-bold">{firstDayOfThisMonth.format('MMMM')}</span>
      <span class="font-light">{firstDayOfThisMonth.format('YYYY')}</span>
    </h1>
    <div class="flex space-x-2 sm:space-x-4">
      <button
        on:click={onShift(-1)}
        aria-label="Previous"
        class="w-8 h-8 hover:bg-gray-200 hover:dark:bg-neutral-600 rounded-md inline-flex justify-center items-center text-gray-500 hover:text-gray-950 dark:text-neutral-500 hover:dark:text-white transition"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
      <button
        on:click={onShift(1)}
        aria-label="Next"
        class="w-8 h-8 hover:bg-gray-200 hover:dark:bg-neutral-600 rounded-md inline-flex justify-center items-center text-gray-500 hover:text-gray-950 dark:text-neutral-500 hover:dark:text-white transition"
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>
  </div>

  <slot {items} />
</div>
