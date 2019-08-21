import { Thumbnails } from './youtube-thumbnail'

export interface ChannelSnippet {
  readonly title: string
  readonly description: string
  readonly thumbnails: Thumbnails
}

export interface ChannelStatistics {
  readonly videoCount: number
  readonly subscriberCount: number
}

export interface Channel {
  readonly id: string
  readonly etag: string
  readonly snippet: ChannelSnippet
  readonly statistics: ChannelStatistics
}
