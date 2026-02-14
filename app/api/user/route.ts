import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();
    const user = await User.find({});
    return Response.json(user);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: any) {
  try {
    await connectDB();
    const body = await request.json();
    const { username, email, password} = body;

    const user = await User.create({ username, email, password});
    return Response.json(
      {
        message: "User created sucessfully",
        success: true,
        user: user,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json({ error: error.message });
  }
}