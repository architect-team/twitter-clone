'use client';

import React from 'react';
import { Button } from '../_components/button';
import { classNames, getGravatarImageUrl } from '../_components/utils';
import { Identity } from '@ory/client';
import { Avatar } from '../_components/avatar';
import Link from 'next/link';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/store';

type Yeet = {
  id: string;
  message: string;
  createdAt: string;
  ownerId: string;
  user: Identity;
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const YeetFeed = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [rows, setRows] = React.useState<Yeet[]>([]);
  const [moreYeetsAvailable, setMoreYeetsAvailable] = React.useState(false);

  const { session } = useAppSelector((state) => state.auth);

  const loadMoreRows = async () => {
    setIsLoading(true);

    const searchParams = new URLSearchParams();
    searchParams.set('take', '20');
    if (rows.length > 0) {
      searchParams.set('cursor', rows[rows.length - 1].id);
    }

    const res = await fetch('/api/feed?' + searchParams.toString());
    const { total, rows: data } = await res.json();
    for (const index in data) {
      const res = await fetch(`/api/profile/${data[index].ownerId}`);
      const identity = await res.json();
      data[index].user = identity;
    }

    setRows([...rows, ...data]);
    setIsLoading(false);

    if (rows.length + data.length < total) {
      setMoreYeetsAvailable(true);
    } else {
      setMoreYeetsAvailable(false);
    }
  };

  React.useEffect(() => {
    loadMoreRows();
  }, []);

  return (
    <>
      <ul
        role="list"
        className={classNames(
          'divide-y divide-gray-100',
          Boolean(session) ? 'border-t border-gray-200' : ''
        )}
      >
        {rows.map((yeet, yeetIndex) => (
          <li
            key={yeet.id}
            className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
          >
            <Link href={`/yeets/${yeet.id}`} className="flex gap-x-4">
              <Avatar
                type="image"
                src={getGravatarImageUrl(yeet.user.traits.email)}
                size="lg"
                className="flex-none"
                rounded="full"
              />
              <div className="min-w-0 flex-auto">
                <p className="font-semibold leading-6 text-gray-900">
                  <span className="absolute inset-x-0 -top-px bottom-0" />
                  {yeet.user.traits.name.first} {yeet.user.traits.name.last}
                </p>
                <p className="mt-1 flex leading-5 text-gray-600">
                  {yeet.message}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="p-6 border-t border-gray-200">
        {isLoading ? (
          <div>Loading</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          moreYeetsAvailable && (
            <Button
              color="primary"
              className="rounded-full"
              onClick={() => loadMoreRows()}
            >
              Load more
            </Button>
          )
        )}
      </div>
    </>
  );
};
