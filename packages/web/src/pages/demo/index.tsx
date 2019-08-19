import { VideoDto } from '@hashtube/core/lib/video'
import axios from 'axios'
import { Component, Vue } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'

@Component<DemoPage>({
  async asyncData () {
    const videos = (await axios.get<VideoDto[]>('http://localhost:4000/api/demo/videos')).data
    return {
      videos,
    }
  },
})
export default class DemoPage extends Vue {
  readonly videos!: VideoDto[]

  head (): MetaInfo {
    return {
      title: 'Demo',
    }
  }

  render () {
    return (
      <v-container>
        <ul>
          {this.videos.map((video) => (
            <li key={video.id}>
              <nuxt-link to={`/demo/${video.id}`}>{video.title}</nuxt-link>
            </li>
          ))}
        </ul>
      </v-container>
    )
  }
}
