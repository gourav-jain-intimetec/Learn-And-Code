import promptSync from 'prompt-sync';

const prompt = promptSync();

export const getValidUserInput = (): { blogName: string; start: number; end: number } => {
    while (true) {
        const blogName = prompt("Enter Tumblr blog name: ").trim();
        const range = prompt("Enter range (e.g., 10-20): ").trim();
        const [start, end] = range.split("-").map(Number);

        if (blogName && !isNaN(start) && !isNaN(end) && start >= 1 && end >= start) {
            return { blogName, start, end };
        }

        console.log("Invalid input. Please enter a valid blog name and numeric range (e.g., 10-20).");
    }
}