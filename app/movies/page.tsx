import Link from 'next/link';
import MovieList from './movie-list';
import { Metadata } from 'next';
import Button from '../(layout)/button';

export const metadata: Metadata = {
  title: 'Movie list',
};

export default function MovieListPage() {
  return (
    <main className="container mx-auto h-full p-12 max-w-2xl">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold grow">Movies</h1>

        <Link href="/movies/new">
          <Button>New</Button>
        </Link>
      </div>

      <MovieList />
    </main>
  );
}
