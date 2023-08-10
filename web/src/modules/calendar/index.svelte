<script lang="ts">
  import dayjs from 'dayjs'
  import MediaQuery from 'svelte-media-queries'

  import Desktop from './desktop/index.svelte'
  import Mobile from './mobile/index.svelte'
  import Renderer from './renderer.svelte'

  const initialMonth = (() => {
    const params = new URLSearchParams(window.location.search)
    const month = params.get('month')
    if (month?.match(/^\d{4}-\d{2}$/)) {
      return dayjs(month + '-01').tz('Asia/Bangkok')
    }
  })()

  let firstDayOfThisMonth =
    initialMonth || dayjs().tz('Asia/Bangkok').set('date', 1).startOf('day')

  let onShift = (amount: number) => () => {
    firstDayOfThisMonth = firstDayOfThisMonth.add(amount, 'month')
  }

  const today = dayjs().tz('Asia/Bangkok').startOf('day')

  $: dayInWeekOfFirstDay = firstDayOfThisMonth.day()
  $: lastDayOfMonth = firstDayOfThisMonth.endOf('month').date()

  $: calendarDays = Array.from({
    length:
      // leftover of last month
      dayInWeekOfFirstDay +
      // flood until the end of the month
      lastDayOfMonth +
      // leftover to fill until calendar full
      (7 - ((dayInWeekOfFirstDay + lastDayOfMonth) % 7)),
  }).map((_, i) => firstDayOfThisMonth.add(i - dayInWeekOfFirstDay, 'day'))

  // prettier-ignore
  let isMobile: boolean;
</script>

<MediaQuery query="(max-width: 640px)" bind:matches={isMobile} />

<Renderer
  bind:firstDayOfThisMonth
  filterStart={calendarDays[0]}
  filterEnd={calendarDays[calendarDays.length - 1]}
  bind:onShift
  let:items
>
  {#if isMobile}
    <Mobile bind:calendarDays bind:firstDayOfThisMonth {items} {today} />
  {:else}
    <Desktop bind:calendarDays bind:firstDayOfThisMonth {items} {today} />
  {/if}
</Renderer>
