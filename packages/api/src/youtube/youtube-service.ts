import { VideoDto } from '@hashtube/core/lib/video'
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
    const video: YouTube.Video | undefined = await this.youTubeApi.getVideoById(id)
    if (!video) {
      return
    }
    const {
      snippet: { publishedAt, title, description, tags, thumbnails },
      contentDetails: { duration },
      statistics: { viewCount, likeCount, dislikeCount },
    } = video
    const thumbnail = thumbnails.high.url
    return new VideoDto({
      id,
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
