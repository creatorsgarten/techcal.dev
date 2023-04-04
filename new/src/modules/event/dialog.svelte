<script lang="ts">
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    Transition,
    TransitionChild,
  } from '@rgossiaux/svelte-headlessui'

  import { linkify } from '../../functions/linkify'

  import type { GoogleCalendarItem } from '../../@types/GoogleCalendar'

  export let onClose: () => void
  export let open: boolean
  export let item: GoogleCalendarItem;
</script>

<Transition appear show={open}>
  <Dialog
    as="div"
    class="fixed inset-0 z-10 overflow-y-auto"
    on:close={onClose}
  >
    <div class="min-h-screen px-4 text-center">
      <TransitionChild
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <DialogOverlay class="fixed inset-0 bg-gray-500/75" />
      </TransitionChild>

      <TransitionChild
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <span class="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <div
          class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
        >
          <DialogTitle
            as="h3"
            class="text-lg font-medium leading-6 text-gray-900"
          >
            {item.summary}
          </DialogTitle>
          <div class="mt-2 text-gray-600 text-sm break-all">
            {@html linkify(item.description ?? '')}
          </div>

          <div class="mt-4">
            <button
              type="button"
              class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              on:click={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </TransitionChild>
    </div>
  </Dialog>
</Transition>
