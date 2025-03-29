export interface TumblrBlogInfo {
    title: string;
    name: string;
    description: string;
    totalPosts: number;
}

export interface TumblrPhotoPost {
    id: string;
    "photo-url-1280": string;
}

export interface TumblrResponse {
    tumblelog: {
        title: string;
        name: string;
        description: string;
    };
    posts: TumblrPhotoPost[];
    "posts-total":number
}