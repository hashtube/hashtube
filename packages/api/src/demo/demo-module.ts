import { Module } from '@nestjs/common'
import config from 'config'
import { YouTubeModule } from '../youtube'
import { DemoConfig } from './demo-config'
import { DemoController } from './demo-controller'
import { DemoService } from './demo-service'

const demoConfig: DemoConfig = config.get<DemoConfig>('demo')

@Module({
  imports: [YouTubeModule],
  providers: [{ provide: 'demoConfig', useValue: demoConfig }, DemoService],
  controllers: [DemoController],
})
export class DemoModule {}
