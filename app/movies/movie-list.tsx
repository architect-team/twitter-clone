import 'server-only';

import prisma from '../prisma';

export default async function MovieList() {
  const movies = await prisma.movie.findMany();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-6">
      {movies.map((movie) => (
        <p key={movie.id}>{movie.name}</p>
      ))}
    </div>
  );
}
