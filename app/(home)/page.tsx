import { Metadata } from 'next';
import React from 'react';
import { YeetFeed } from './yeet-feed';
import { PageHeader } from '../_components/page-header';
import { HomeYeetForm } from './home-yeet-form';

export const metadata: Metadata = {
  title: 'The Y Feed',
  description: 'A list of messages yeeted into the ether!',
};

const HomePage = () => {
  return (
    <>
      <PageHeader>Home</PageHeader>
      <HomeYeetForm />
      <YeetFeed />
    </>
  );
};

export default HomePage;
