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
      <div className="p-6 border-b border-gray-200">
        <HomeYeetForm />
      </div>
      <div>
        <YeetFeed />
      </div>
    </>
  );
};

export default HomePage;
