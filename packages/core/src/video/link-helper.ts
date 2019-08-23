import LinkifyIt from 'linkify-it'

export class LinkHelper {
  private readonly linkifyIt = new LinkifyIt()

  getUrls (text: string): string[] {
    const matches = this.linkifyIt.match(text)
    const urls: string[] = matches ? matches.map(({ url }) => url) : []
    return urls
  }

  getHtml (text: string): string {
    const matches = this.linkifyIt.match(text)
    const parts = []
    let lastIndex = 0
    if (matches) {
      for (const match of matches) {
        if (lastIndex < match.index) {
          parts.push(text.slice(lastIndex, match.index))
        }
        parts.push(`<a target='_blank' href='${match.url}'>`)
        parts.push(this.truncateLinkText(match.text))
        parts.push('</a>')
        lastIndex = match.lastIndex
      }
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }
    return parts.join('').replace(/\r?\n/g, '<br>')
  }

  private truncateLinkText (linkText: string, maxLength = 50): string {
    return linkText.length <= maxLength ? linkText : `${linkText.substring(0, maxLength - 3)}...`
  }
}
