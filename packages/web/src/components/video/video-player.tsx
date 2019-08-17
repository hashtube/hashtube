import { VideoDto } from '@hashtube/core/lib/video'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Player, withYouTube } from '../../utils/youtube'
import './video-player.scss'

const playerPlaceholder = 'playerPlaceholder'

@Component<VideoPlayer>({})
export class VideoPlayer extends Vue {
  @Prop(Object)
  readonly video!: VideoDto
  player!: Player

  mounted () {
    withYouTube((PlayerContructor) => {
      this.player = new PlayerContructor(playerPlaceholder, {
        videoId: this.video.id,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
          origin: window.location.origin,
        },
      })
    })
  }

  beforeDestroy () {
    if (!this.player) {
      return
    }
    this.player.destroy()
  }

  render () {
    // height and background is set here so that the placeholder shows first
    return (
      <div class='video-player__background' style='height: 56.25vw; background: #000;'>
        <div class='video-player__container'>
          <div id={playerPlaceholder}/>
        </div>
      </div>
    )
  }
}
