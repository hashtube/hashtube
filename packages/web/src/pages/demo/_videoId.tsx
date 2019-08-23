import { LinkHelper, LinkPreviewDto, VideoDto } from '@hashtube/core/lib/video'
import { Context } from '@nuxt/types'
import axios from 'axios'
import { Component, Vue } from 'nuxt-property-decorator'
import { MetaInfo } from 'vue-meta'
import { VideoPlayer } from '../../components/video/video-player'

@Component<VideoPage>({
  components: {
    VideoPlayer,
  },
  async asyncData (context: Context) {
    const linkHelper = new LinkHelper()
    const { params } = context
    const video = (await axios.get<VideoDto>(`http://localhost:4000/api/demo/videos/${params.videoId}`)).data
    return {
      video,
      linkifiedDescription: linkHelper.getHtml(video.description),
    }
  },
})
export default class VideoPage extends Vue {
  readonly video!: VideoDto
  readonly linkifiedDescription!: string
  linkPreviews: LinkPreviewDto[] = []

  head (): MetaInfo {
    return {
      title: this.video.title,
    }
  }

  async loadLinkPreviews () {
    this.linkPreviews = (await axios.get<LinkPreviewDto[]>(`http://localhost:4000/api/demo/videos/${this.video.id}/links`)).data
  }

  render () {
    return (
      <div>
        <video-player video={this.video}/>
        <v-container class='my-3'>
          <v-row>
            <v-col cols={12} md={5}>
              <h1 class='title mb-3'>{this.video.title}</h1>
              <p domProps={{ innerHTML: this.linkifiedDescription }}/>
            </v-col>
            <v-col cols={12} md={3}>
              <h2 class='subtitle-2'>Link Preview</h2>
              <div>
              {
                this.linkPreviews.map((linkPreview: LinkPreviewDto) =>
                  <div key={linkPreview.url} >
                    <a href={`${linkPreview.url}`} >{linkPreview.title}</a>
                    <p>{linkPreview.description}</p>
                  </div>,
                )
              }
              </div>
            </v-col>
            <v-col cols={12} md={4}>
              <h2 class='subtitle-2'>Related Videos</h2>
            </v-col>
          </v-row>
        </v-container>
      </div>
    )
  }
}
