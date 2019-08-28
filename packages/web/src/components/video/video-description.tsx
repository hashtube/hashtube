import { getHtml } from '@hashtube/core/lib/utils/link-helper'
import { LinkPreviewDto } from '@hashtube/core/lib/video'
import axios from 'axios'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component<VideoDescription>({})
export class VideoDescription extends Vue {
  @Prop(String)
  readonly description!: string
  linkPreviews: LinkPreviewDto[] = []

  async mounted () {
    const params = this.$route.params
    this.linkPreviews.push(...(await axios.get<LinkPreviewDto[]>(`http://localhost:4000/api/demo/videos/${params.videoId}/links`)).data)
  }

  get html (): string {
    return getHtml(this.description)
  }

  render () {
    return (
      <div>
        <p domProps={{ innerHTML: this.html }}/>
        <h2 class='subtitle-2'>Link Preview</h2>
        <div>
        {
          this.linkPreviews && this.linkPreviews.map((linkPreview: LinkPreviewDto) =>
            <div key={linkPreview.url} >
              <a href={`${linkPreview.url}`} >{linkPreview.title}</a>
              <p>{linkPreview.description}</p>
            </div>,
          )
        }
        </div>
      </div>
    )
  }
}
