import { Post } from "../../post/models/single-post.model";
import { User } from "./user.model";

export interface Profile{
    id: number,
    user?: User,
    posts: Post[],
    followers?: number[],
    following?: number[],
    chatMember?: boolean
}
