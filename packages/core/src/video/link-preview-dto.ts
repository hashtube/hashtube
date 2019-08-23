export class LinkPreviewDto {
  readonly url: string
  readonly title: string
  readonly description: string

  constructor (linkPreviewDtoOptions: Omit<LinkPreviewDto, '__isDto'>) {
    const { url, title, description } = linkPreviewDtoOptions
    this.url = url
    this.title = title
    this.description = description
  }

  __isDto () {
    return true
  }
}
