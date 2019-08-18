import LinkifyIt from 'linkify-it'

export interface LinkifyText {
  text: string
  urls: string[]
}

const linkifyIt = new LinkifyIt()

export const linkify = (text: string): LinkifyText => {
  const matches = linkifyIt.match(text)
  const urls: string[] = matches ? matches.map(({ url }) => url) : []
  return {
    text,
    urls,
  }
}
