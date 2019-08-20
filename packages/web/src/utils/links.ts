import LinkifyIt from 'linkify-it'

export interface LinkifyText {
  text: string
  urls: string[]
}

const maxLength = 50
const linkifyIt = new LinkifyIt()

export const linkify = (text: string): LinkifyText => {
  const content = text.replace(/\r?\n/g, '<br>')
  const matches = linkifyIt.match(content)
  const result = []
  let lastIndex = 0
  if (matches) {
    matches.forEach((match) => {
      if (lastIndex < match.index) {
        result.push(content.slice(lastIndex, match.index))
      }
      result.push(`<a target='_blank' href='${match.url}'>`)
      result.push(match.text.length > maxLength ? `${match.text.substring(0, maxLength - 3)}...` : match.text)
      result.push('</a>')
      lastIndex = match.lastIndex
    })
  }
  if (lastIndex < content.length) {
    result.push(content.slice(lastIndex))
  }
  const urls: string[] = matches ? matches.map(({ url }) => url) : []
  return {
    text: result.join(''),
    urls,
  }
}
