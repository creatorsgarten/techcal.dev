<script lang="ts">
  import { onMount } from 'svelte'

  import dayjs from 'dayjs'
  import utc from 'dayjs/plugin/utc'
  import timezone from 'dayjs/plugin/timezone'
  import isBetween from 'dayjs/plugin/isBetween'

  import Calendar from '$modules/calendar/index.svelte'
  let guideComponent: Promise<typeof import('$modules/guide/index.svelte')>
  let eventModalComponent: Promise<
    typeof import('$modules/eventModal/index.svelte')
  >

  import { getCalendarEvent } from '$functions/getCalendarEvent'
  import { activeEvent } from '$context/activeEvent'
  import { captureEvent } from '$context/captureEvent'
  import { captureMode } from '$context/captureMode'
  import EventBanner from '$modules/eventBanner/eventBanner.svelte'

  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(isBetween)

  onMount(() => {
    guideComponent = import('$modules/guide/index.svelte')
    eventModalComponent = import('$modules/eventModal/index.svelte')
  })

  onMount(async () => {
    const params = new URLSearchParams(window.location.search)

    let pathname = window.location.pathname.split('/')
    pathname.shift()

    if (params.get('capture')) {
      captureMode.set(true)
      document.body.style.fontFamily = `Inter, Anuphan, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
      const capture = params.get('capture')
      captureEvent.set(await getCalendarEvent(capture))
    } else if (pathname[0] === 'event' && pathname.length === 2) {
      try {
        activeEvent.set(await getCalendarEvent(pathname[1]))
      } catch (e) {
        history.pushState({}, '', '/')
      }
    } else {
      history.pushState({}, '', '/')
    }
  })
</script>

<main class="h-full overflow-y-hidden sm:overflow-auto space-y-2">
  {#if !$captureMode}
    <div class="flex justify-between px-2 sm:px-4 py-2 items-center">
      <div>
        <h1 class="text-2xl sm:text-3xl text-sky-500 dark:text-sky-400">
          {'<' + import.meta.env.VITE_SITE_NAME + ' />'}
        </h1>
        <!-- <p class="text-gray-950 pt-1 text-sm sm:text-base">รวม อัพเดท Tech event, Tech Meetup ในไทยไว้ในที่เดียว</p> -->
      </div>
      <div class="flex items-center ml-2">
        {#if guideComponent}
          {#await guideComponent then { default: Guide }}
            <Guide />
          {/await}
        {/if}
      </div>
    </div>
    <Calendar />
  {:else}
    <div class="border-b border-gray-200">
      <div id="capture-stage" class="flex flex-col">
        <div class="bg-black text-white p-8 px-12">
          {#if $captureEvent}
            <EventBanner item={$captureEvent} />
          {/if}
        </div>
        <div class="flex-none pb-12 pt-8">
          <Calendar />
        </div>
      </div>
    </div>
  {/if}
</main>

{#if eventModalComponent}
  {#await eventModalComponent then { default: EventModal }}
    <EventModal />
  {/await}
{/if}
