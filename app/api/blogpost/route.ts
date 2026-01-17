import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";


export async function GET() {
    try {
        await connectDB();
    } catch(error) {

    }
}