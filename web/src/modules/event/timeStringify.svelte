<script lang="ts">
  import dayjs from 'dayjs'
  import type { DayWithTime, FullDay } from '$types/GoogleCalendar'

  export let calendarTime: FullDay | DayWithTime

  const targetFormat =
    typeof (calendarTime as FullDay).date === 'undefined'
      ? 'singleDay'
      : 'multiDay'

  const parsedDate = dayjs(
    (calendarTime as FullDay).date ?? (calendarTime as DayWithTime).dateTime,
    (calendarTime as DayWithTime).timeZone
  ).tz('Asia/Bangkok')
</script>

<span
  >{parsedDate.format(
    targetFormat === 'singleDay' ? 'DD MMM HH:mm' : 'DD MMM'
  )}</span
>
