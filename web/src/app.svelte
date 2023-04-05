<script lang="ts">
  import dayjs from 'dayjs'

  import utc from 'dayjs/plugin/utc'
  import timezone from 'dayjs/plugin/timezone'
  import isBetween from 'dayjs/plugin/isBetween'

  import Calendar from '$modules/calendar/index.svelte'
  import Guide from '$modules/guide/index.svelte'

  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(isBetween)
</script>

<main class="h-full overflow-y-hidden sm:overflow-auto space-y-2">
  <div class="flex justify-between px-2 sm:px-4 py-2 items-center">
    <div>
      <h1 class="text-2xl sm:text-3xl text-sky-500 dark:text-sky-400">
        {`<thai-tech-calendar />`}
      </h1>
      <!-- <p class="text-gray-950 pt-1 text-sm sm:text-base">รวม อัพเดท Tech event, Tech Meetup ในไทยไว้ในที่เดียว</p> -->
    </div>
    <div class="flex items-center ml-2">
      <Guide />
    </div>
  </div>

  <Calendar />
</main>
