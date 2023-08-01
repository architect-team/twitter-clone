'use client';

import React from 'react';
import { Button } from '../_components/button';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { getGravatarImageUrl } from '../_components/utils';
import { Identity } from '@ory/client';

type Yeet = {
  id: string;
  message: string;
  createdAt: string;
  ownerId: string;
  user: Identity;
};

export const YeetFeed = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [rows, setRows] = React.useState<Yeet[]>([]);

  const loadMoreRows = async () => {
    setIsLoading(true);

    const searchParams = new URLSearchParams();
    searchParams.set('take', '20');
    if (rows.length > 0) {
      searchParams.set('cursor', rows[rows.length - 1].id);
    }

    const res = await fetch('/api/feed?' + searchParams.toString());
    const data = await res.json();
    for (const index in data) {
      const res = await fetch(`/api/profile/${data[index].ownerId}`);
      const identity = await res.json();
      data[index].user = identity;
    }

    setRows([...rows, ...data]);
    setIsLoading(false);
  };

  React.useEffect(() => {
    loadMoreRows();
  }, []);

  return (
    <>
      <div className="flow-root">
        <ul role="list">
          {rows.map((yeet, yeetIndex) => (
            <li key={yeet.id}>
              <div className="relative pb-8">
                {yeetIndex !== rows.length - 1 ? (
                  <span
                    className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <img
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                      src={getGravatarImageUrl(yeet.user.traits.email)}
                      alt=""
                    />

                    <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                      <ChatBubbleLeftEllipsisIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm">
                        <a href="#" className="font-medium text-gray-900">
                          {yeet.user.traits.name.first}{' '}
                          {yeet.user.traits.name.last}
                        </a>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Commented on {new Date(yeet.createdAt).toDateString()}
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>{yeet.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {isLoading ? (
        <div>Loading</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <Button
          color="primary"
          className="rounded-full"
          onClick={() => loadMoreRows()}
        >
          Load more
        </Button>
      )}
    </>
  );
};
