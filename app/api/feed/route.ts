import prisma from '@/app/prisma';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get('cursor');
  const take = Number(searchParams.get('take') || 10);
  const rows = await prisma.yeet.findMany({
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    take,
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(rows);
};
