"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
class TumblrBlogs {
    constructor() {
        this.baseUrl = "https://{blogName}.tumblr.com/api/read/json";
    }
    fetchBlogData(blogName, startPostNo, endPostNo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (startPostNo < 1 || endPostNo < startPostNo) {
                    throw new Error("Invalid range");
                }
                const numOfPosts = endPostNo - startPostNo + 1;
                const url = this.baseUrl
                    .replace("{blogName}", blogName)
                    .concat(`?type=photo&num=${numOfPosts}&start=${startPostNo - 1}`); //API uses 0th indexing for data
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const textData = yield response.text();
                //Response of API = var tumblr_api_read = { "tumblelog": {...},posts-total:12,posts:[..], ... };
                const jsonData = textData
                    .replace(/^var tumblr_api_read = /, "") // Remove JS variable declaration
                    .replace(/;/, "") // Remove trailing semicolon and whitespace
                    .trim();
                const data = JSON.parse(jsonData);
                const blogInfo = {
                    title: data.tumblelog.title,
                    name: data.tumblelog.name,
                    description: data.tumblelog.description,
                    totalPosts: data["posts-total"]
                };
                const postNumberAndImageURL = new Map();
                data.posts.forEach((post, index) => {
                    const postNumber = startPostNo + index;
                    postNumberAndImageURL.set(postNumber, [post["photo-url-1280"]]);
                });
                return { blogInfo, postNumberAndImageURL };
            }
            catch (error) {
                console.error("Error fetching Tumblr data:", error);
                throw error;
            }
        });
    }
    printBlogDetails(blogInfo, postNumberAndImageURL) {
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
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const tumblrBlog = new TumblrBlogs();
        const blogName = prompt("enter the Tumblr blog name: ");
        const range = prompt("enter the range (Ex. 10-20): ");
        const [start, end] = range.split('-').map(Number);
        try {
            const { blogInfo, postNumberAndImageURL } = yield tumblrBlog.fetchBlogData(blogName, start, end);
            tumblrBlog.printBlogDetails(blogInfo, postNumberAndImageURL);
        }
        catch (error) {
            console.error("Failed to fetch Tumblr data:", error);
        }
    });
}
main();
