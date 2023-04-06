<script lang="ts">
  import { createDialog } from 'svelte-headlessui'
  import Transition from 'svelte-transition'

  import QuestionMark from '../icons/questionMark.svelte'
  import RSS from '../icons/rss.svelte'

  const dialog = createDialog({ label: 'guide' })
</script>

<button
  on:click={dialog.open}
  aria-label="Help"
  class="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-xl border-b-4 border-b-gray-300 shrink-0 dark:bg-neutral-700 dark:border-b-neutral-800"
>
  <QuestionMark class="w-6 h-6 text-gray-950 dark:text-white" />
</button>

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
            <article class="text-gray-700 dark:text-neutral-100 text-sm space-y-2">
              <h4 class="font-medium text-lg text-gray-950 dark:text-white">
                เพิ่ม Event ยังไง?
              </h4>
              <ol class="list-decimal pl-4">
                <li>
                  สร้าง Event ใน Calendar ของตัวเอง ที่ไหนก็ได้ เช่น Google
                  Calendar, Outlook, iCloud Calendar
                </li>
                <li>
                  ส่ง Invite ไปที่ <span class="text-blue-500"
                    >tech.cal.th@gmail.com</span
                  >
                </li>
                <li>เสร็จ เรียบร้อย!!!!</li>
              </ol>
              <p>
                ไม่ขอรับ Training event, Private event, หรือ Event
                ที่ไม่เกี่ยวกับ Tech ลงใน Calendar หลัก นะครับ
              </p>
              <img
                src="/demo.png"
                loading="lazy"
                class="w-full h-auto"
                alt="ตัวอย่าง"
              />
              <h4 class="font-medium text-lg text-gray-950 dark:text-white">
                แจ้งเตือน Event ยังไง?
              </h4>
              <ol class="list-decimal pl-4">
                <li>
                  <span>เพิ่มไฟล์ <code>ical</code> ไปยัง calendar ของคุณ</span>
                  <span class="flex py-2">
                    <a
                      class="flex items-center px-2 py-1 bg-gray-200 rounded-md text-gray-950"
                      href="https://calendar.google.com/calendar/ical/tech.cal.th@gmail.com/public/basic.ics"
                    >
                      <RSS class="w-4 h-4" /> รับไฟล์ ical
                    </a>
                  </span>
                </li>
                <li>
                  ตั้งการแจ้งเตือนให้กับ th.techcal.dev ตาม Platform ของ ตัวเอง <a
                    class="text-blue-500"
                    href="https://support.google.com/calendar/answer/6285327?hl=th"
                    >Google Calendar</a
                  >,
                  <a
                    class="text-blue-500"
                    href="https://support.office.com/th-th/article/การแจ้งเตือนปฏิทินใน-outlook-web-app-763907f8-65be-4138-beeb-fc770adf5c6d"
                    >Outlook Calendar</a
                  >
                </li>
              </ol>
            </article>

            <div class="mt-4 flex justify-end">
              <button
                type="button"
                aria-label="Close"
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
