'use client';

import { Button, ButtonProps } from 'flowbite-react';
import { RefAttributes } from 'react';

export default function ButtonComponent(
  props: ButtonProps & RefAttributes<HTMLButtonElement | HTMLAnchorElement>
) {
  return <Button {...props} />;
}
