import { Thumbnails } from './youtube-thumbnail'

export interface SearchId {
  kind: string
  videoId?: string
  channelId?: string
}

export interface SearchSnippet {
  readonly publishedAt: string
  readonly title: string
  readonly description: string
  readonly thumbnails: Thumbnails
}

export interface Search {
  readonly etag: string
  readonly id: SearchId
  readonly snippet: SearchSnippet
}
