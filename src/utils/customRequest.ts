import { Request } from "express"

export interface iUserAuthInfoRequest extends Request {
  user?: any // or any other type
}