
export enum Visibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
    FRIENDS = 'friends'
}

export interface UserTagRequest {
    user_id: string;
    username: string;
}

export interface CreatePostRequest {
    creator_id: string;
    content: string;
    visibility?: Visibility;
    user_tags?: UserTagRequest[];
    hashtags?: string[];
}

export interface Post {
    id: string;
    _id?: string;
    creator_id: string;
    content: string;
    visibility: Visibility;
    user_tags: Array<{ id: string; name: string }>;
    hashtags: string[];
    createdAt?: string;
    type?: string;
    like_count?: number;
    comment_count?: number;
    qoute_post_count?: number;
    urls?: Array<{
        key: string;
        url: string;
    }>;
    poll?: {
        end_at: string;
        status_poll: string;
        poll_options: Array<{
            content: string;
            vote_count: number;
            voters: string[];
            _id: string;
        }>;
    };
    creator?: {
        id: string;
        username: string;
        email: string;
        fullname: string;
        link: string;
        bio: string;
        avatar: string;
    };
}
