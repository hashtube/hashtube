import { YouTube } from '@hashtube/youtube'
import { Module } from '@nestjs/common'
import config from 'config'
import { YouTubeService } from './youtube-service'

const youTubeConfig: YouTube.Config = config.get<YouTube.Config>('youTube')

@Module({
  providers: [{ provide: 'youTubeConfig', useValue: youTubeConfig }, YouTubeService],
  exports: [YouTubeService],
})
export class YouTubeModule {}
