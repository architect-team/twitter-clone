'use client';

import React from 'react';
import { Button } from '@/app/_components/button';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getGravatarImageUrl } from '../_components/utils';
import { Avatar } from '@/app/_components/avatar';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const HomeYeetForm = () => {
  const [message, setMessage] = React.useState('');
  const { session } = useAppSelector((state) => state.auth);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`/api/yeets`, {
      method: 'POST',
      body: JSON.stringify({
        message,
      }),
    }).then(() => {
      location.reload();
    });
  };

  return session ? (
    <div className="flex items-start space-x-4 p-6">
      <div className="flex-shrink-0">
        <Avatar
          type="image"
          rounded="full"
          src={getGravatarImageUrl(session.identity.traits.email)}
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
              className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-primary-400 focus:ring-0 sm:leading-6"
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
  ) : null;
};
