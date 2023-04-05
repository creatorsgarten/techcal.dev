<script lang="ts">
  import Transition from 'svelte-transition'

  import { linkify } from '$functions/linkify'

  import type { createDialog } from 'svelte-headlessui'
  import type { GoogleCalendarItem } from '$types/GoogleCalendar'
  import Meta from './meta.svelte'

  export let dialog: ReturnType<typeof createDialog>
  // prettier-ignore
  export let item: GoogleCalendarItem;
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
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all"
            use:dialog.modal
          >
            <Meta {item} />

            <article
              class="mt-2 text-gray-600 dark:text-neutral-100 text-sm break-all"
            >
              <p class="pb-2">
                <a href={item.htmlLink} target="_blank" rel="noreferrer"
                  >Google Calendar</a
                >
              </p>
              {@html linkify(item.description ?? '')}
            </article>

            <div class="mt-4 flex justify-end">
              <button
                type="button"
                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                on:click={dialog.close}
              >
                Close
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</div>
