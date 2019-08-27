import { VideoDto } from '@hashtube/core/lib/video'
import { Context } from '@nuxt/types'
import axios from 'axios'
import { Component, Vue } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import { VideoDescription } from '../../components/video/video-description'
import { VideoPlayer } from '../../components/video/video-player'

@Component<VideoPage>({
  components: {
    VideoPlayer,
    VideoDescription,
  },
  async asyncData (context: Context) {
    const { params } = context
    const video = (await axios.get<VideoDto>(`http://localhost:4000/api/demo/videos/${params.videoId}`)).data
    return {
      video,
    }
  },
})
export default class VideoPage extends Vue {
  readonly video!: VideoDto

  head (): MetaInfo {
    return {
      title: this.video.title,
    }
  }

  render () {
    return (
      <div>
        <video-player video={this.video}/>
        <v-container class='my-3'>
          <v-row>
            <v-col cols={12} md={7}>
              <h1 class='title mb-3'>{this.video.title}</h1>
              <video-description description={this.video.description}/>
            </v-col>
            <v-col cols={12} md={5}>
              <h2 class='subtitle-2'>Related Videos</h2>
            </v-col>
          </v-row>
        </v-container>
      </div>
    )
  }
}
