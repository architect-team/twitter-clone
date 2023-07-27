import { Metadata } from 'next';
import React from 'react';
import { YeetFeed } from './yeet-feed';
import { PageHeader } from './_components/page-header';
import { HomeYeetForm } from './home-yeet-form';

export const metadata: Metadata = {
  title: 'The Y Feed',
  description: 'A list of messages yeeted into the ether',
};

const HomePage = () => (
  <>
    <main className="lg:pl-72 h-full">
      <div className="xl:pr-96 h-full py-10 lg:py-6">
        <PageHeader>Home</PageHeader>
        <div className="px-4 sm:px-6 lg:px-8 py-10 lg:py-6 border-b border-gray-200">
          <HomeYeetForm />
        </div>
        <div className="px-4 sm:px-6 lg:px-8 py-10 lg:py-6">
          <YeetFeed />
        </div>
      </div>
    </main>

    <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
      {/* Secondary column (hidden on smaller screens) */}
    </aside>
  </>
);

export default HomePage;
