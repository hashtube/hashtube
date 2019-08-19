import { ChannelDto } from './channel-dto'

export interface VideoDtoOptions {
  readonly id: string
  readonly channel: ChannelDto
  readonly publishedAt: string
  readonly title: string
  readonly description: string
  readonly tags: string[]
  readonly duration: string
  readonly thumbnail: string
  readonly viewCount: number
  readonly likeCount?: number
  readonly dislikeCount?: number
}

export class VideoDto {
  readonly id: string
  readonly channel: ChannelDto
  readonly publishedAt: string
  readonly title: string
  readonly description: string
  readonly tags: string[]
  readonly duration: string
  readonly thumbnail: string
  readonly viewCount: number
  readonly likeCount?: number
  readonly dislikeCount?: number

  constructor (videoDtoOptions: Omit<VideoDto, '__isDto'>) {
    const {
      id,
      channel,
      publishedAt,
      title,
      description,
      tags,
      duration,
      thumbnail,
      viewCount,
      likeCount,
      dislikeCount,
    } = videoDtoOptions
    this.id = id
    this.channel = channel
    this.publishedAt = publishedAt
    this.title = title
    this.description = description
    this.tags = tags
    this.duration = duration
    this.thumbnail = thumbnail
    this.viewCount = viewCount
    this.likeCount = likeCount
    this.dislikeCount = dislikeCount
  }

  __isDto () {
    return true
  }
}
