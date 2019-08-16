export interface Thumbnail {
  readonly url: string
  readonly width: number
  readonly height: number
}

export interface Thumbnails {
  readonly default: Thumbnail
  readonly medium: Thumbnail
  readonly high: Thumbnail
  readonly standard: Thumbnail
  readonly maxres: Thumbnail
}
