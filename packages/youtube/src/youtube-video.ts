import { Thumbnails } from './youtube-thumbnail'

export interface VideoSnippet {
  readonly publishedAt: string
  readonly title: string
  readonly description: string
  readonly channelId: string
  readonly thumbnails: Thumbnails
  readonly tags: string[]
}

export interface VideoContentDetails {
  readonly duration: string
}

export interface VideoStatistics {
  readonly viewCount: number
  readonly likeCount?: number
  readonly dislikeCount?: number
}

export interface Video {
  readonly id: string
  readonly etag: string
  readonly snippet: VideoSnippet
  readonly contentDetails: VideoContentDetails
  readonly statistics: VideoStatistics
}
