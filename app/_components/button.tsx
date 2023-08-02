import Link from 'next/link';

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  color?: 'primary';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'pill';
  href?: string;
};

export const Button = (props: ButtonProps) => {
  const classes = props.className ? props.className.split(' ') : [];
  classes.push('font-semibold');

  if (props.color === 'primary') {
    classes.push('bg-primary-400', 'text-white', 'hover:bg-primary-300');

    if (props.disabled) {
      classes.push(
        'bg-primary-200',
        'hover:bg-primary-200',
        'text-white',
        'cursor-not-allowed'
      );
    }
  }

  switch (props.size) {
    case 'sm': {
      classes.push('px-2', 'py-1', 'text-sm');
      break;
    }
    case 'lg': {
      classes.push('px-6', 'py-3', 'text-lg');
      break;
    }
    default: {
      classes.push('px-4', 'py-2', 'text-md');
    }
  }

  const btn = <button {...props} className={classes.join(' ')} />;
  return props.href ? <Link href={props.href}>{btn}</Link> : btn;
};
