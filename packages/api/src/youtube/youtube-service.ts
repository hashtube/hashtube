import { ChannelDto, VideoDto } from '@hashtube/core/lib/video'
import { YouTube } from '@hashtube/youtube'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class YouTubeService {
  private readonly youTubeApi: YouTube.ApiClient

  constructor (
    @Inject('youTubeConfig')
    youTubeConfig: YouTube.Config,
  ) {
    this.youTubeApi = new YouTube.ApiClient(youTubeConfig)
  }

  async getVideoById (id: string): Promise<VideoDto | undefined> {
    const youTubeVideo: YouTube.Video | undefined = await this.youTubeApi.getVideoById(id)
    if (!youTubeVideo) {
      return
    }
    const channel: ChannelDto | undefined = await this.getChannelById(youTubeVideo.snippet.channelId)
    if (!channel) {
      return
    }
    return this.assembleVideo(youTubeVideo, channel)
  }

  async getChannelById (id: string): Promise<ChannelDto | undefined> {
    const channel: YouTube.Channel | undefined = await this.youTubeApi.getChannelById(id)
    if (!channel) {
      return
    }
    const {
      snippet: { title, description, thumbnails },
      statistics: { videoCount, subscriberCount },
    } = channel
    const thumbnail = thumbnails.high.url
    return new ChannelDto({
      id,
      title,
      description,
      thumbnail,
      videoCount,
      subscriberCount,
    })
  }

  async getVideosByChannel (channel: ChannelDto): Promise<VideoDto[]> {
    const searchResults: YouTube.Search[] = await this.youTubeApi.getVideosByChannelId(channel.id)
    const videoIds: string[] = searchResults
      .map((searchResult) => searchResult.id.videoId || '')
      .filter(Boolean)
    const videos: VideoDto[] = []
    for (const videoId of videoIds) {
      const youTubeVideo: YouTube.Video | undefined = await this.youTubeApi.getVideoById(videoId)
      if (!youTubeVideo) {
        continue
      }
      videos.push(this.assembleVideo(youTubeVideo, channel))
    }
    return videos
  }

  private assembleVideo (youTubeVideo: YouTube.Video, channel: ChannelDto): VideoDto {
    const {
      id,
      snippet: { publishedAt, title, description, tags, thumbnails },
      contentDetails: { duration },
      statistics: { viewCount, likeCount, dislikeCount },
    } = youTubeVideo
    const thumbnail = thumbnails.high.url
    return new VideoDto({
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
    })
  }
}
