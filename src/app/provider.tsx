'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { PropsWithChildren } from 'react';

export const Provider = (props: PropsWithChildren) => (
  <ReduxProvider store={store}>{props.children}</ReduxProvider>
);
