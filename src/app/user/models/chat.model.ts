import { Profile } from "./profile.model";

export interface Chat {
  id?: number,
  title: string,
  members: Profile[],
  adminProfileId?: number,
  chatType: string
}
