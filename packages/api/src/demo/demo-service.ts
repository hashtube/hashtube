import { ChannelDto, LinkHelper, LinkPreviewDto, VideoDto } from '@hashtube/core/lib/video'
import { Inject, Injectable } from '@nestjs/common'
import axios from 'axios'
import fs from 'fs'
import metascraper from 'metascraper'
import metascraperDescription from 'metascraper-description'
import metascraperTitle from 'metascraper-title'
import path from 'path'
import { YouTubeService } from '../youtube'
import { DemoConfig } from './demo-config'

export interface DemoData {
  channels: ChannelDto[]
  videos: VideoDto[]
}

@Injectable()
export class DemoService {
  private data: DemoData
  private readonly linkHelper: LinkHelper = new LinkHelper()

  constructor (
    @Inject('demoConfig')
    private readonly demoConfig: DemoConfig,
    private readonly youTubeService: YouTubeService,
  ) {
    if (fs.existsSync(demoConfig.dataPath)) {
      this.data = JSON.parse(fs.readFileSync(demoConfig.dataPath, 'utf-8'))
    } else {
      this.data = { channels: [], videos: [] }
    }
  }

  getAllVideos (): VideoDto[] {
    return this.data.videos
  }

  getVideoById (id: string): VideoDto | undefined {
    return this.data.videos.find((video) => video.id === id)
  }

  async getLinkPreviewsByVideo (video: VideoDto): Promise<LinkPreviewDto[]> {
    const linkPreviews: LinkPreviewDto[] = []
    const scraper = metascraper([metascraperDescription(), metascraperTitle()])
    const urls: string[] = this.linkHelper.getUrls(video.description)
    for (const url of urls) {
      const html = (await axios.get<string>(url)).data
      const { title, description } = await scraper({ html, url })
      linkPreviews.push(new LinkPreviewDto({ url, title, description }))
    }
    return linkPreviews
  }

  async refreshData (): Promise<void> {
    const channels: ChannelDto[] = []
    const videos: VideoDto[] = []
    for (const channelId of this.demoConfig.channels) {
      const channel: ChannelDto | undefined = await this.youTubeService.getChannelById(channelId)
      if (channel) {
        channels.push(channel)
      }
    }
    for (const channel of channels) {
      console.log(`Refresh data of channel: ${channel.title}`)
      const videosOfChannel = await this.youTubeService.getVideosByChannel(channel)
      videos.push(...videosOfChannel)
    }
    console.log(`Done, ${videos.length} videos found`)
    this.data = { channels, videos }
    fs.mkdirSync(path.dirname(this.demoConfig.dataPath), { recursive: true })
    fs.writeFileSync(this.demoConfig.dataPath, JSON.stringify(this.data, undefined, 2))
  }
}
