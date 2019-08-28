import { LinkPreviewDto, VideoDto } from '@hashtube/core/lib/video'
import { Controller, ForbiddenException, Get, Headers, Inject, NotFoundException, Param, Post } from '@nestjs/common'
import { DemoConfig } from './demo-config'
import { DemoService } from './demo-service'

@Controller('demo')
export class DemoController {
  constructor (
    @Inject('demoConfig')
    private readonly demoConfig: DemoConfig,
    private readonly demoService: DemoService,
  ) {}

  @Get('videos')
  getAllVideos (): VideoDto[] {
    return this.demoService.getAllVideos()
  }

  @Get('videos/:id')
  getVideoById (@Param('id') id: string): VideoDto {
    const video: VideoDto | undefined = this.demoService.getVideoById(id)
    if (!video) {
      throw new NotFoundException()
    }
    return video
  }

  @Get('videos/:id/links')
  async getLinkPreviewsByVideoId (@Param('id') id: string): Promise<LinkPreviewDto[]> {
    const linkPreviews: LinkPreviewDto[] | undefined = await this.demoService.getLinkPreviewsByVideoId(id)
    if (!linkPreviews) {
      throw new NotFoundException()
    }
    return linkPreviews
  }

  @Post('admin/refresh')
  async refreshData (@Headers('x-api-key') apiKey: string): Promise<void> {
    this.checkApiKey(apiKey)
    await this.demoService.refreshData()
  }

  private checkApiKey (apiKey: string): void {
    if (apiKey !== this.demoConfig.secretKey) {
      throw new ForbiddenException()
    }
  }
}
