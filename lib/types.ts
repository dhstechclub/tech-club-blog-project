import { Dirent } from "fs";

export class PostSummary {
    title: string;
    url: string;

    constructor(file: Dirent) {
        const splitName = file.name.split(".");
        
        this.title = splitName.slice(0, splitName.length - 1).join(".");
        this.url = `/posts/${file.path.split("\\").slice(1).join("\\")}/${file.name}`;
    }
}