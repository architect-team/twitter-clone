'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import { PropsWithChildren, useRef } from 'react';
import { AuthState, setAuthData } from '@/store/authSlice';
import { Session } from '@ory/client';

export const Provider = (
  props: PropsWithChildren<{ auth?: { session: Session; logoutUrl: string } }>
) => {
  const loaded = useRef(false);
  if (!loaded.current) {
    if (props.auth) {
      store.dispatch(setAuthData(props.auth));
    }

    loaded.current = true;
  }

  return <ReduxProvider store={store}>{props.children}</ReduxProvider>;
};
