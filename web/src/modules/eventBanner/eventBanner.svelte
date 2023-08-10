<script lang="ts">
  import TimeStringify from '$modules/event/timeStringify.svelte'
  import Buildings from '$modules/icons/buildings.svelte'
  import Time from '$modules/icons/time.svelte'
  import type { GoogleCalendarItem } from '$types/GoogleCalendar'

  export let item: GoogleCalendarItem
</script>

{#if item}
  <div class="text-xl flex flex-col justify-center">
    <div>
      <div class="mb-2">
        <strong class="bg-sky-700 text-white px-2 py-1 text-sm rounded"
          >Tech event</strong
        >
      </div>
      <h1 class="text-5xl font-bold mb-4 truncate">{item.summary}</h1>
      {#if item.location}
        <div class="flex pt-2 items-center space-x-3">
          <Buildings class="w-4 h-4 shrink-0" />
          <span class="truncate">{item.location}</span>
        </div>
      {/if}
      <div class="flex pt-2 items-center space-x-3">
        <Time class="w-4 h-4 shrink-0" />
        <span>
          <TimeStringify calendarTime={item.start} />
          <span>–</span>
          <TimeStringify calendarTime={item.end} />
        </span>
      </div>
    </div>
  </div>
{/if}
