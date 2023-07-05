'use client';

import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useState } from 'react';

export default function AddMovieForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async (event: any) => {
    event.preventDefault();
    await fetch('/api/movies', {
      method: 'POST',
      body: JSON.stringify({ title, description, releaseDate }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    router.push('/movies');
  };

  const onTitleChange = (event: any) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const onReleaseDateChange = (event: any) => {
    event.preventDefault();
    setReleaseDate(event.target.value);
  };

  const onDescriptionChange = (event: any) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  return (
    <form
      className="bg-white rounded-lg shadow-md p-6 my-6"
      onSubmit={onSubmit}
    >
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/datepicker.min.js" />
      <div className="mb-2 block">
        <Label htmlFor="title" value="Movie title" />
      </div>
      <TextInput
        id="title"
        required
        type="text"
        onChange={onTitleChange}
        value={title}
      />

      <div className="mb-2 mt-6 block">
        <Label htmlFor="releaseDate" value="Release date" />
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          datepicker="true"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="mm/dd/yyyy"
        />
      </div>

      <div className="mb-2 mt-6 block">
        <Label htmlFor="description" value="Movie description" />
      </div>
      <Textarea
        id="description"
        required
        onChange={onDescriptionChange}
        value={description}
      />

      <Button type="submit" className="mt-6">
        Add
      </Button>
    </form>
  );
}
