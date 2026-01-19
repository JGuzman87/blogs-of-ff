import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find({});
    return Response.json(posts);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: any) {
  try {
    await connectDB();
    const body = await request.json();
    const { title, content } = body;

    const post = await Post.create({ title, content });
    return Response.json(
      {
        message: "Post created sucessfully",
        success: true,
        post: post,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}
