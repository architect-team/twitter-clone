'use client';

import React from 'react';
import { Button } from './_components/button';

export const HomeYeetForm = () => {
  const [message, setMessage] = React.useState('');

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`/api/yeets`, {
      method: 'POST',
      body: JSON.stringify({
        message,
      }),
    });

    location.reload();
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form action="#" onSubmit={submitForm}>
          <div className="border-b border-gray-200 focus-within:border-primary-400">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={3}
              maxLength={280}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-primary-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add your comment..."
              defaultValue={''}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="flex justify-between pt-2">
            <div className="flex items-center space-x-5"></div>
            <div className="flex-shrink-0">
              <Button
                type="submit"
                color="primary"
                className="inline-flex items-center rounded-full"
              >
                Yeet
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
