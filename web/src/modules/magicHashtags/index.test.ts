import { it, expect } from 'vitest'
import { extractMagicHashtags } from './index'

it('extracts hashtag out of message', () => {
  const { text, matchedHashtags } = extractMagicHashtags('a b c\n#online')
  expect(matchedHashtags).toEqual(['online'])
  expect(text.trim()).toEqual('a b c')
})

it('leaves url alone', () => {
  const { text, matchedHashtags } = extractMagicHashtags(
    'https://example.com/#online'
  )
  expect(matchedHashtags).toEqual([])
  expect(text.trim()).toEqual('https://example.com/#online')
})
