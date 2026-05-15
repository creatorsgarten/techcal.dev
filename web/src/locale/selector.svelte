<script lang="ts">
  import { createMenu } from 'svelte-headlessui'
  import Transition from 'svelte-transition'
  import { locale } from 'svelte-i18n'

  import { defaultLanguage } from '$locale'

  import FlagEN from '$modules/icons/flags/en.svelte'
  import FlagTH from '$modules/icons/flags/th.svelte'
  import FlagID from '$modules/icons/flags/id.svelte'
  import { LocaleManager } from '$functions/localeManager'
  import { Locale } from '$types/Locale'

  const menu = createMenu({ label: 'Language' })

  const languages = [
    { icon: FlagEN, value: Locale.English, text: 'English' },
    { icon: FlagTH, value: Locale.Thai, text: 'ไทย' },
    { icon: FlagID, value: Locale.Indonesian, text: 'Bahasa Indonesia' },
  ]

  const handleSubmit = (selected: string) => {
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
  <button use:menu.button aria-label="Language" class="square-btn">
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
        class="absolute right-0 mt-2 p-2 w-48 origin-top-right rounded-xl dark:text-white dark:bg-neutral-700 text-gray-900 bg-white shadow-lg focus:outline-none border-neutral-200"
      >
        {#each languages as language}
          {@const active =
            $menu.active === language.text ||
            language.value === currentLanguage}
          <button
            use:menu.item
            on:click={() => handleSubmit(language.text)}
            class="group flex rounded-md items-center w-full px-2 py-2 text-sm space-x-2 cursor-pointer"
          >
            <div
              class={`w-1 h-4 rounded-full ${
                active ? 'bg-blue-950 dark:bg-blue-400' : 'bg-transparent'
              }`}
            ></div>
            <svelte:component this={language.icon} class="w-5 h-5" {active} />
            <span>{language.text}</span>
          </button>
        {/each}
      </div>
    </Transition>
  </div>
</div>
