import { PageHeader } from '@/app/_components/page-header';
import prisma from '@/app/prisma';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const YeetPage = async ({ params }: { params: { id: string } }) => {
  const yeet = await prisma.yeet.findUniqueOrThrow({
    where: {
      id: params.id,
    },
  });

  return (
    <>
      <PageHeader back="/">Yeet</PageHeader>
      <p>{yeet.id}</p>
    </>
  );
};

export default YeetPage;
