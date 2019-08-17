import { VideoDto } from '@hashtube/core/lib/video'
import { Context } from '@nuxt/vue-app'
import axios from 'axios'
import { Component, Vue } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import { VideoPlayer } from '../../components/video/video-player'
import { linkify, LinkifyText } from '../../utils/linkify'

@Component<VideoPage>({
  components: {
    VideoPlayer,
  },
  async asyncData (context: Context) {
    const { params } = context
    const video = (await axios.get<VideoDto>(`http://localhost:4000/api/demo/videos/${params.videoId}`)).data
    return {
      video,
      linkifyDescription: linkify(video.description),
    }
  },
})
export default class VideoPage extends Vue {
  readonly video!: VideoDto
  readonly linkifyDescription!: LinkifyText

  head (): MetaInfo {
    return {
      title: this.video.title,
    }
  }

  render () {
    return (
      <div>
        <video-player video={this.video}/>
        <v-container>
          <h1 class='title my-3'>{this.video.title}</h1>
          <p class='text__white-space-pre-wrap'>{this.linkifyDescription.text}</p>
        </v-container>
      </div>
    )
  }
}
