import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
  const token = cookies().get("token")?.value;
  if (!token) 
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded) 
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const movies = await prisma.movie.findMany({ 
    where: { userId: decoded.userId }, 
  });
  return NextResponse.json(movies);
}

export async function POST(req: Request) {
  const token = cookies().get("token")?.value;
  if (!token) 
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = verifyToken(token);
  if (!decoded) 
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });

  const { title, publishingYear, poster } = await req.json();
  const movie = await prisma.movie.create({
    data: { title, publishingYear, poster, userId: decoded.userId },
  });

  return NextResponse.json(movie);
}
