<script lang="ts">
  import { onMount } from 'svelte'
  import { createEvent } from 'ics'
  import dayjs from 'dayjs'

  import Transition from 'svelte-transition'
  import Meta from './meta.svelte'

  import { createDialog } from 'svelte-headlessui'
  import { activeEvent } from '$context/activeEvent'
  import { linkify } from '$functions/linkify'
  import { l } from '$locale'

  import type { DateArray, EventAttributes, EventStatus } from 'ics'
  import type {
    GoogleCalendarItem,
    FullDay,
    DayWithTime,
  } from '$types/GoogleCalendar'
  import { extractMagicHashtags, magicHashtags } from '$modules/magicHashtags'

  const dialog = createDialog({ label: 'event' })
  let item: GoogleCalendarItem | null = null
  let initialLoad = false

  onMount(() => {
    let dataListener = activeEvent.subscribe(o => {
      if (o !== null) {
        item = o
        dialog.open()
      }
    })
    let dialogListener = dialog.subscribe(({ expanded }) => {
      if (!initialLoad) initialLoad = true
      else if (initialLoad && expanded === false) history.pushState({}, '', '/')
    })

    return () => {
      dataListener()
      dialogListener()
    }
  })

  const itemTimeToTs = (calendarTime: FullDay | DayWithTime): DateArray => {
    const tsDayJs = dayjs(
      (calendarTime as FullDay).date ?? (calendarTime as DayWithTime).dateTime,
      (calendarTime as DayWithTime).timeZone
    ).tz('Asia/Bangkok')

    return (calendarTime as FullDay)
      ? [tsDayJs.year(), tsDayJs.month(), tsDayJs.date(), 0, 0]
      : [
          tsDayJs.year(),
          tsDayJs.month(),
          tsDayJs.date(),
          tsDayJs.hour(),
          tsDayJs.minute(),
        ]
  }

  const exportToICS = async () => {
    const event: EventAttributes = {
      start: itemTimeToTs(item!.start),
      end: itemTimeToTs(item!.end),
      startInputType: 'local',
      endInputType: 'local',
      title: item!.summary,
      description: item!.description,
      location: item!.location,
      url: item!.htmlLink,
      uid: item!.iCalUID,
      categories: [item!.eventType],
      status: item!.status as EventStatus,
      organizer: { email: item!.organizer.email },
      calName: 'TechCal.Dev',
    }

    const filename = 'TechCal.dev.ics'
    const file = (await new Promise((resolve, reject) => {
      createEvent(event, (error, value) => {
        if (error) {
          reject(error)
        }

        resolve(new File([value], filename, { type: 'text/calendar' }))
      })
    })) as File
    const url = URL.createObjectURL(file)
    const anchor = document.createElement('a')

    anchor.href = URL.createObjectURL(file)
    anchor.download = 'TechCal.dev.ics'
    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
    URL.revokeObjectURL(url)
  }

  $: parsedResult = extractMagicHashtags(item?.description || '')
  $: description = parsedResult.text
</script>

<div class="relative z-10">
  <Transition show={$dialog.expanded}>
    <Transition
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="fixed inset-0 bg-black bg-opacity-25"
        on:click={dialog.close}
      />
    </Transition>

    <div class="fixed inset-0 overflow-y-auto">
      <div class="flex min-h-full items-center justify-center p-4 text-center">
        <Transition
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all"
            use:dialog.modal
          >
            {#if item !== null}
              <button
                type="button"
                aria-label="Close"
                class="float-right inline-flex justify-center rounded-md border border-transparent text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 opacity-50"
                on:click={dialog.close}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                  ><path
                    fill="currentColor"
                    d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
                  /></svg
                >
              </button>

              <Meta {item} />

              <article
                class="overflow-auto mt-2 text-gray-600 dark:text-neutral-100 text-sm break-words"
              >
                <div class="whitespace-pre-line">
                  {@html linkify(description)}
                </div>
                {#if parsedResult.matchedHashtags.length}
                  <div class="flex gap-2 mt-4 flex-wrap">
                    {#each parsedResult.matchedHashtags as hashtag}
                      <div
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                      >
                        <span>
                          <strong class="font-medium">#{hashtag}</strong>
                          {' - '}{magicHashtags[hashtag].description}</span
                        >
                      </div>
                    {/each}
                  </div>
                {/if}
              </article>
            {/if}

            <div class="mt-4 flex justify-end">
              {#if item !== null}
                <button
                  type="button"
                  aria-label="Export"
                  class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 mx-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  on:click={exportToICS}
                >
                  {$l('export')}
                </button>
              {/if}
              <button
                type="button"
                aria-label="Close"
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                on:click={dialog.close}
              >
                {$l('close')}
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</div>
