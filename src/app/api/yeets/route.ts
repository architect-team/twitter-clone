import { oryServer } from '@/ory';
import prisma from '@/prisma';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
  const body = await request.json();

  const { data: session } = await oryServer.toSession({
    cookie: request.headers.get('cookie') || undefined,
  });

  const yeet = await prisma.yeet.create({
    data: {
      message: body.message,
      ownerId: session.identity.id,
    },
  });
  return NextResponse.json(yeet, {
    status: 201,
  });
};
