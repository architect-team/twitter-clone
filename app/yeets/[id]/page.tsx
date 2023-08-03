import { PageHeader } from '@/app/_components/page-header';
import prisma from '@/app/prisma';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

type YeetPageProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({ params }: YeetPageProps) => {
  const yeet = await prisma.yeet.findUniqueOrThrow({
    where: {
      id: params.id,
    },
  });

  return {
    title: yeet.message,
  };
};

const YeetPage = async ({ params }: YeetPageProps) => {
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
