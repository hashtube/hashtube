import LinkifyIt from 'linkify-it'

const linkifyIt = new LinkifyIt()

export interface LinkifiedText {
  html: string
  urls: string[]
}

const truncateLinkText = (linkText: string, maxLength = 50) => {
  return linkText.length <= maxLength ? linkText : `${linkText.substring(0, maxLength - 3)}...`
}

export const linkify = (text: string): LinkifiedText => {
  const matches = linkifyIt.match(text)
  const parts = []
  let lastIndex = 0
  if (matches) {
    for (const match of matches) {
      if (lastIndex < match.index) {
        parts.push(text.slice(lastIndex, match.index))
      }
      parts.push(`<a target='_blank' href='${match.url}'>`)
      parts.push(truncateLinkText(match.text))
      parts.push('</a>')
      lastIndex = match.lastIndex
    }
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }
  const urls: string[] = matches ? matches.map(({ url }) => url) : []
  return {
    html: parts.join('').replace(/\r?\n/g, '<br>'),
    urls,
  }
}
