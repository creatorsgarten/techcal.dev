<script lang="ts">
  import { createMenu } from 'svelte-headlessui'
  import Transition from 'svelte-transition'
  import { getLocaleFromNavigator, locale } from 'svelte-i18n'

  import { defaultLanguage } from '$locale'

  import FlagEN from '$modules/icons/flags/en.svelte'
  import FlagTH from '$modules/icons/flags/th.svelte'
  import FlagID from '$modules/icons/flags/id.svelte'
  import { LocaleManager } from '$functions/localeManager'

  const menu = createMenu({ label: 'Language' })

  const languages = [
    { icon: FlagEN, value: 'en', text: 'English' },
    { icon: FlagTH, value: 'th', text: 'ไทย' },
    { icon: FlagID, value: 'id', text: 'Bahasa Indonesia' },
  ]

  const handleSubmit = (e: Event) => {
    const { selected } = (e as CustomEvent).detail
    const targetLanguage = languages.find(l => l.text === selected)!.value

    LocaleManager.set(targetLanguage)
    locale.set(targetLanguage)
  }

  $: currentLanguage = (
    languages.find(
      l => l.value === $locale || $locale?.startsWith(l.value)
    ) ?? { value: defaultLanguage }
  )?.value
  $: currentIcon = languages.find(l => l.value === currentLanguage)!.icon
</script>

<div>
  <button
    use:menu.button
    on:select={handleSubmit}
    aria-label="Help"
    class="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-xl border-b-4 border-b-gray-300 shrink-0 dark:bg-neutral-700 dark:border-b-neutral-800"
  >
    <svelte:component this={currentIcon} class="w-6 h-6" />
  </button>

  <div class="relative z-10">
    <Transition
      show={$menu.expanded}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div
        use:menu.items
        class="absolute right-0 mt-2 p-2 w-48 origin-top-right rounded-xl dark:text-white dark:bg-neutral-700 text-gray-900 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        {#each languages as language}
          {@const active =
            $menu.active === language.text ||
            language.value === currentLanguage}
          <button
            use:menu.item
            class="group flex rounded-md items-center w-full px-2 py-2 text-sm space-x-2"
          >
            <div
              class={`w-1 h-4 rounded-full ${
                active ? 'bg-blue-950 dark:bg-blue-400' : 'bg-transparent'
              }`}
            />
            <svelte:component this={language.icon} class="w-5 h-5" {active} />
            <span>{language.text}</span>
          </button>
        {/each}
      </div>
    </Transition>
  </div>
</div>
