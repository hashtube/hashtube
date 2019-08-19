export interface ChannelDtoOptions {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly thumbnail: string
  readonly videoCount: number
  readonly subscriberCount: number
}

export class ChannelDto {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly thumbnail: string
  readonly videoCount: number
  readonly subscriberCount: number

  constructor (channelDtoOptions: Omit<ChannelDto, '__isDto'>) {
    const { id, title, description, thumbnail, videoCount, subscriberCount } = channelDtoOptions
    this.id = id
    this.title = title
    this.description = description
    this.thumbnail = thumbnail
    this.videoCount = videoCount
    this.subscriberCount = subscriberCount
  }

  __isDto () {
    return true
  }
}
