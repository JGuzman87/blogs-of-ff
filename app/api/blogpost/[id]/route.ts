import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { ObjectId } from "mongodb";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const { id } = params;
    if (!ObjectId.isValid(id)) {
      return Response.json({ error: "could not find post with id" }, { status: 400 });
    }
    const deletePost = await Post.findByIdAndDelete(id);

    if (!deletePost) {
      return Response.json({ error: "Post not found" }, { status: 400 });
    }

    return Response.json(
      { message: "Post deleted successfully", deletePost },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
  }
}
