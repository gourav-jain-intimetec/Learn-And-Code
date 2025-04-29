import { TumblrBlogInfo, TumblrResponse } from "./utils/interfaces";
import promptSync from 'prompt-sync';
import { getValidUserInput } from "./utils/utilityFunctions";
const prompt = promptSync();

class TumblrBlog {
    private baseUrl: string = "https://{blogName}.tumblr.com/api/read/json";

    constructor(
        private blogName: string,
        private startPostNo: number,
        private endPostNo: number
    ) { }

    async getBlogData(): Promise<{
        blogInfo: TumblrBlogInfo;
        postNumberAndImageURL: Map<number, string[]>;
    }> {
        try {
            let isValidPostRange = this.validatePostRange();
            if (!isValidPostRange) {
                throw new Error("Invalid range");
            }

            const apiUrl = this.buildApiUrl();
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const rawResponse = await response.text();
            const cleanedJson = this.extractJsonFromResponse(rawResponse);
            const data: TumblrResponse = JSON.parse(cleanedJson);

            const blogInfo: TumblrBlogInfo = this.mapToBlogInfo(data);
            const postImageMap = this.mapPostsToImageUrls(data);

            return { blogInfo, postNumberAndImageURL: postImageMap };
        } catch (error) {
            console.error("Error fetching Tumblr data:", error);
            throw error;
        }
    }

    private buildApiUrl():string {
        const numOfPosts = this.endPostNo - this.startPostNo + 1;
        const url = this.baseUrl
            .replace("{blogName}", this.blogName)
            .concat(`?type=photo&num=${numOfPosts}&start=${this.startPostNo - 1}`); //API uses 0th indexing for data
        
        return url;
    }

    private validatePostRange(): boolean {
        return this.startPostNo >= 1 && this.endPostNo >= this.startPostNo;
    }

    private extractJsonFromResponse(response: string): string {
        // Response of API = var tumblr_api_read = {
        // "tumblelog": {...},
        // posts-total:12,posts:[..],
        // };
        //..
        return response
            .replace(/^var tumblr_api_read = /, "")
            .replace(/;\s*$/, "")
            .trim();
    }

    private mapToBlogInfo(data: TumblrResponse): TumblrBlogInfo {
        return {
            title: data.tumblelog.title,
            name: data.tumblelog.name,
            description: data.tumblelog.description,
            totalPosts: data["posts-total"]
        };
    }

    private mapPostsToImageUrls(data: TumblrResponse): Map<number, string[]> {
        const postMap = new Map<number, string[]>();

        data.posts.forEach((post, index) => {
            const postNumber = this.startPostNo + index;
            const imageUrl = post["photo-url-1280"];

            if (imageUrl) {
                postMap.set(postNumber, [imageUrl]);
            }
        });

        return postMap;
    }

    public printBlogDetails(blogInfo: TumblrBlogInfo, postNumberAndImageURL: Map<number, string[]>): void {
        console.log("| title:", blogInfo.title + " |");
        console.log("| name:", blogInfo.name + " |");
        console.log("| description:", blogInfo.description + " |");
        console.log("| no of post:", blogInfo.totalPosts + " |");

        postNumberAndImageURL.forEach((urls, postNumber) => {
            urls.forEach(url => {
                console.log(`| ${postNumber}. ${url}|`);
            });
        });
    }
}

async function main() {
    const { blogName, start, end } = getValidUserInput();

    const tumblrBlog = new TumblrBlog(blogName, start, end);

    try {
        const { blogInfo, postNumberAndImageURL } = await tumblrBlog.getBlogData();
        tumblrBlog.printBlogDetails(blogInfo, postNumberAndImageURL);
    } catch (error) {
        console.error("Failed to fetch Tumblr data:", error);
    }
}

main();
