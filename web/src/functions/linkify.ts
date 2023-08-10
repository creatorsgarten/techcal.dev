import Autolinker from 'autolinker'

export const linkify = (inputText: string) => {
  return Autolinker.link(inputText)
}
