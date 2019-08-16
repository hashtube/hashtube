import { Module } from '@nestjs/common'
import { DemoModule } from './demo'

@Module({
  imports: [DemoModule],
})
export class AppModule {}
