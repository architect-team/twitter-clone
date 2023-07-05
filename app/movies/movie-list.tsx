import 'server-only';

import prisma from '../prisma';
import Link from 'next/link';
import ButtonComponent from '../(layout)/button';

export default async function MovieList() {
  const movies = await prisma.movie.findMany();

  return movies.length > 0 ? (
    movies.map((movie) => (
      <div
        key={movie.id}
        className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-6"
      >
        <Link href={`/movies/${movie.id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {movie.title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {movie.description}
        </p>

        <Link href={`/movies/${movie.id}`}>
          <ButtonComponent>
            Read more
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </ButtonComponent>
        </Link>
      </div>
    ))
  ) : (
    <div className="bg-white rounded-lg shadow-md p-6 my-6">
      <p>No movies found.</p>
    </div>
  );
}
