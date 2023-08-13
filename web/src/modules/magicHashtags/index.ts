function defineMagicHashtags<T extends Record<string, MagicHashtagInfo>>(
  definition: T
) {
  return definition
}

interface MagicHashtagInfo {
  description: string
}

export const magicHashtags = defineMagicHashtags({
  online: {
    description: 'Online event',
  },
  live: {
    description: 'Live video available',
  },
  english: {
    description: 'Event is in English',
  },
})

export type MagicHashtag = keyof typeof magicHashtags

const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi

export function extractMagicHashtags(description: string) {
  let { replaced: text, unreplace } = replaceholder(description, urlRegex)
  const matchedHashtags = new Set<MagicHashtag>()
  text = text.replace(/#(\w+)/g, (a, hashtag) => {
    if (magicHashtags.hasOwnProperty(hashtag)) {
      matchedHashtags.add(hashtag as MagicHashtag)
      return ''
    }
    return a
  })
  text = unreplace(text)
  return {
    text,
    matchedHashtags: Array.from(matchedHashtags).sort(),
  }
}

export function replaceholder(source: string, pattern: RegExp) {
  const map = new Map<string, string>()
  const generatePlaceholder = () => {
    return `[__PLACEHOLDER_${map.size}__]`
  }
  const replaced = source.replace(pattern, match => {
    const placeholder = generatePlaceholder()
    map.set(placeholder, match)
    return placeholder
  })
  return {
    replaced,
    unreplace: (replaced: string) => {
      return replaced.replace(
        /\[__PLACEHOLDER_(\d+)__\]/g,
        (_) => {
          return map.get(_) || _
        }
      )
    },
  }
}
