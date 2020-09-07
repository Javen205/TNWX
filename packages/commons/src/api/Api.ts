export type ApiResponse<T = {}> = {
  errcode: number
  errmsg: string
} & T
