import axios, { AxiosInstance } from 'axios'
import { Channel } from './youtube-channel'
import { Config } from './youtube-config'
import { ListResponse } from './youtube-response'
import { Search } from './youtube-search'
import { Video } from './youtube-video'

// TODO use ETags and gzip https://developers.google.com/youtube/v3/getting-started#performance
export class ApiClient {
  private readonly http: AxiosInstance

  constructor (private readonly config: Config) {
    this.http = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
    })
  }

  getVideoById (id: string): Promise<Video | undefined> {
    return this.getItem('videos', {
      id,
      part: 'snippet,contentDetails,statistics',
    })
  }

  getChannelById (id: string): Promise<Channel | undefined> {
    return this.getItem('channels', {
      id,
      part: 'snippet,statistics',
    })
  }

  getVideosByChannelId (channelId: string): Promise<Search[]> {
    return this.getItems('search', {
      channelId,
      type: 'video',
      part: 'snippet',
      videoEmbeddable: true,
      maxResults: 50,
      order: 'date',
    })
  }

  private async getItems<T> (url: string, params: object): Promise<T[]> {
    const response: ListResponse<T> = await this.request<T>(url, params)
    return response.items
  }

  private async getItem<T> (url: string, params: object): Promise<T | undefined> {
    const response: ListResponse<T> = await this.request<T>(url, params)
    if (!response.pageInfo.totalResults) {
      return
    }
    return response.items[0]
  }

  private async request<T> (url: string, params: object): Promise<ListResponse<T>> {
    const response: ListResponse<T> = (await this.http.get<ListResponse<T>>(url, {
      params: {
        ...params,
        key: this.config.apiKey,
      },
    })).data
    await this.sleep(100)
    if (response.error) {
      throw response.error
    }
    return response
  }

  private sleep (ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
