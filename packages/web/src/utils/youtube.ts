export interface Player {
  playVideo (): void
  destroy (): void
}

type ParamFlag = 0 | 1

export interface PlayerParams {
  autoplay?: ParamFlag
  modestbranding?: ParamFlag
  rel?: ParamFlag
  origin?: string
}

export interface PlayerOptions {
  videoId: string
  playerVars?: PlayerParams
  events?: object
}

export type PlayerContructor = new (element: Element | string, options: PlayerOptions) => Player

interface YouTube {
  Player: PlayerContructor
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void
    YT?: YouTube
  }
}

export type YouTubeReadyHandler = (Player: PlayerContructor) => void

const pendingHandlers: YouTubeReadyHandler[] = []

export const withYouTube = (handler: YouTubeReadyHandler) => {
  if (window.YT) {
    handler(window.YT.Player)
    return
  }
  pendingHandlers.push(handler)
  const youTubeApiScriptTag = document.createElement('script')
  youTubeApiScriptTag.src = 'https://www.youtube.com/iframe_api'
  const firstScriptTag = document.getElementsByTagName('script')[0]
  if (!firstScriptTag.parentNode) {
    throw new Error('First script tag has no parent node')
  }
  firstScriptTag.parentNode.insertBefore(youTubeApiScriptTag, firstScriptTag)
}

if (process.browser) {
  window.onYouTubeIframeAPIReady = () => {
    if (!window.YT) {
      throw new Error('onYouTubeIframeAPIReady is called but window.YT is falsy')
    }
    for (const handler of pendingHandlers) {
      handler(window.YT.Player)
    }
    pendingHandlers.length = 0
  }
}
