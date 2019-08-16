import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { Config } from './youtube-config'
import { ListResponse } from './youtube-response'
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
    return this.getItem(
      this.http.get<ListResponse<Video>>(
        `/videos?id=${id}&part=snippet,contentDetails,statistics`,
        // https://github.com/axios/axios/issues/2190 default params currently does not work
        { params: { key: this.config.apiKey } },
      ),
    )
  }

  private async getItem<T> (request: Promise<AxiosResponse<ListResponse<T>>>): Promise<T | undefined> {
    const response = (await request).data
    if (response.error) {
      throw response.error
    }
    if (!response.pageInfo.totalResults) {
      return
    }
    return response.items[0]
  }
}
