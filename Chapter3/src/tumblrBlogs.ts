import { TumblrBlogInfo, TumblrResponse } from "./utils/interfaces";
import promptSync from 'prompt-sync';
const prompt = promptSync();

class TumblrBlogs {
    private baseUrl: string = "https://{blogName}.tumblr.com/api/read/json";

    async fetchBlogData(blogName: string, startPostNo: number, endPostNo: number): Promise<{
        blogInfo: TumblrBlogInfo;
        postNumberAndImageURL: Map<number, string[]>;
    }> {
        try {
            if (startPostNo < 1 || endPostNo < startPostNo) {
                throw new Error("Invalid range");
            }

            const numOfPosts = endPostNo - startPostNo + 1;
            const url = this.baseUrl
                .replace("{blogName}", blogName)
                .concat(`?type=photo&num=${numOfPosts}&start=${startPostNo - 1}`); //API uses 0th indexing for data

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const textData = await response.text();
            // Response of API = var tumblr_api_read = {
            // "tumblelog": {...},
            // posts-total:12,posts:[..],
            // };
            //..
            const jsonData = textData
                .replace(/^var tumblr_api_read = /, "") // Remove JS variable declaration
                .replace(/;\s*$/, "")                   // Remove trailing semicolon and whitespace
                .trim(); 
            const data: TumblrResponse = JSON.parse(jsonData);

            const blogInfo: TumblrBlogInfo = {
                title: data.tumblelog.title,
                name: data.tumblelog.name,
                description: data.tumblelog.description,
                totalPosts: data["posts-total"]
            };

            const postNumberAndImageURL = new Map<number, string[]>();
            data.posts.forEach((post, index) => {
                const postNumber = startPostNo + index;
                postNumberAndImageURL.set(postNumber, [post["photo-url-1280"]]);
            });

            return { blogInfo, postNumberAndImageURL };
        } catch (error) {
            console.error("Error fetching Tumblr data:", error);
            throw error;
        }
    }

    printBlogDetails(blogInfo: TumblrBlogInfo, postNumberAndImageURL: Map<number, string[]>): void {
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
    const tumblrBlog = new TumblrBlogs();

    const blogName = prompt("enter the Tumblr blog name: ");
    const range = prompt("enter the range (Ex. 10-20): ");
    const [start, end] = range.split('-').map(Number);

    try {
        const { blogInfo, postNumberAndImageURL } = await tumblrBlog.fetchBlogData(blogName, start, end);
        tumblrBlog.printBlogDetails(blogInfo, postNumberAndImageURL);
    } catch (error) {
        console.error("Failed to fetch Tumblr data:", error);
    }
}

main();
