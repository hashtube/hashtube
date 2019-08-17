import { VideoDto } from '@hashtube/core/lib/video'
import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { YouTubeService } from '../youtube'

@Controller('demo')
export class DemoController {
  constructor (private readonly youTubeService: YouTubeService) {}

  @Get('videos/:id')
  async findOne (@Param('id') id: string): Promise<VideoDto> {
    const video: VideoDto | undefined = await this.youTubeService.getVideoById(id)
    if (!video) {
      throw new NotFoundException()
    }
    return video
  }
}
