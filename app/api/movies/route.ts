import { NextResponse } from 'next/server';
import prisma from '../../prisma';

export async function POST(request: Request) {
  const body = await request.json();
  const movie = await prisma.movie.create({
    data: {
      name: body.title,
      description: body.description,
      releaseDate: new Date(),
    },
  });

  return NextResponse.json(movie);
}
