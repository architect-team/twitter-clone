import { Metadata } from 'next';
import AddMovieForm from './add-movie-form';
import { cookies } from 'next/headers';
import { Session } from '@ory/client';
import { oryServer } from '@/app/ory';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Register new movie',
};

export default async function AddMoviePage() {
  let session: Session | undefined;
  try {
    const cookieStore = cookies();
    const { data } = await oryServer.toSession({
      cookie: cookieStore.toString(),
    });
    session = data;
  } catch {
    redirect('/movies');
  }

  return (
    <main className="container mx-auto h-full p-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-center">Add movie</h1>

      <AddMovieForm />
    </main>
  );
}
