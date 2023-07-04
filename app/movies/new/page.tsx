'use client';

import { Label, TextInput, Textarea } from 'flowbite-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/app/(layout)/button';

export default function AddMoviePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit = async (event: any) => {
    event.preventDefault();
    await fetch('/api/movies', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
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

  const onDescriptionChange = (event: any) => {
    event.preventDefault();
    setDescription(event.target.value);
  };

  return (
    <main className="container mx-auto h-full p-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-center">Add movie</h1>

      <form
        className="bg-white rounded-lg shadow-md p-6 my-6"
        onSubmit={onSubmit}
      >
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
    </main>
  );
}
