import { NextResponse } from 'next/server';

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const res = await fetch(
    `${process.env.KRATOS_ADMIN_ADDR}/identities/${params.id}`
  );
  const data = await res.json();
  return NextResponse.json(data);
};
