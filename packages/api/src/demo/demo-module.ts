import { Module } from '@nestjs/common'
import { YouTubeModule } from '../youtube'
import { DemoController } from './demo-controller'

@Module({
  imports: [YouTubeModule],
  controllers: [DemoController],
})
export class DemoModule {}
