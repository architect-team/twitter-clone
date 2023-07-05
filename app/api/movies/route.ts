import { NextResponse } from 'next/server';
import prisma from '../../prisma';
import { oryServer } from '@/app/ory';

export async function POST(request: Request) {
  const body = await request.json();

  const { data: session } = await oryServer.toSession({
    cookie: request.headers.get('cookie') || undefined,
  });

  const movie = await prisma.movie.create({
    data: {
      title: body.title,
      description: body.description,
      ownerId: session.identity.id,
      releaseDate: body.releaseDate || new Date(),
    },
  });

  return NextResponse.json(movie);
}
