import { Metadata } from 'next';
import React from 'react';
import { YeetFeed } from './yeet-feed';
import { PageHeader } from '../_components/page-header';
import { HomeYeetForm } from './home-yeet-form';

export const metadata: Metadata = {
  title: 'The Y Feed',
  description: 'A list of messages yeeted into the ether',
};

const HomePage = () => {
  return (
    <>
      <PageHeader>Home</PageHeader>
      <div className="px-4 sm:px-6 lg:px-8 py-10 lg:py-6 border-b border-gray-200">
        <HomeYeetForm />
      </div>
      <div className="">
        <YeetFeed />
      </div>
    </>
  );
};

export default HomePage;
