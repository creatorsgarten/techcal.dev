<script lang="ts">
  import Dialog from './dialog.svelte'

  import type { GoogleCalendarItem } from '../../@types/GoogleCalendar'

  export let item: GoogleCalendarItem
  export let dayDiff: number

  let open = false

  function closeModal() {
    open = false
  }
  function openModal() {
    open = true
  }
</script>

<div>
  <button
    on:click={openModal}
    class={`w-full rounded-md px-1.5 sm:px-1 py-0.5 sm:py-0  border-l-4 border-blue-950 text-blue-950 dark:text-blue-50 dark:border-blue-400 bg-blue-100 dark:bg-blue-500/40
      ${dayDiff < 0 ? 'opacity-50' : ''}
    `}
    ><span class="line-clamp-3 sm:line-clamp-1 text-sm text-left w-full"
      >{item.summary}</span
    ></button
  >
  <Dialog {item} onClose={closeModal} bind:open />
</div>
