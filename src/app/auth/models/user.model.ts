export interface User{
  id: number,
  name: string,
  surname: string,
  email: string,
  password: string,
  // address: string
  role: number,
  followers: number,
  followingCount: number,
  postsCount: number
}
