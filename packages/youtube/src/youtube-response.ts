export interface RequestError {
  readonly code: number
  readonly message: string
}

export interface PageInfo {
  readonly totalResults: number
  readonly resultsPerPage: number
}

export interface ListResponse<T> {
  readonly error?: RequestError
  readonly etag: string
  readonly prevPageToken: string
  readonly nextPageToken: string
  readonly pageInfo: PageInfo
  readonly items: T[]
}
