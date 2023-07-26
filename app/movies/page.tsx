import Link from 'next/link';
import MovieList from './movie-list';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { oryServer } from '@/app/ory';
import Button from '../(layout)/button';
import { Session } from '@ory/client';

export const metadata: Metadata = {
  title: 'Movie list',
};

// This is so that next build doesn't attempt to prerender the page.
// This would trigger the prisma client during builds which would fail.
export const dynamic = 'force-dynamic';

export default async function MovieListPage() {
  let session: Session | undefined;
  try {
    const cookieStore = cookies();
    const { data } = await oryServer.toSession({
      cookie: cookieStore.toString(),
    });
    session = data;
  } catch {
    // Intentionally left blank
  }

  return (
    <main className="container mx-auto h-full p-12 max-w-2xl">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold grow">Movies</h1>

        {session && (
          <Link href="/movies/new">
            <Button>New</Button>
          </Link>
        )}
      </div>

      <MovieList />
    </main>
  );
}
