import { classNames } from './utils';

export type AvatarProps = (
  | {
      type: 'image';
      src?: string;
    }
  | {
      type: 'initials';
      initials: string;
    }
) & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  alt?: string;
  rounded?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

export const Avatar = (props: AvatarProps) => {
  const classes: string[] = [
    'inline-block',
    props.rounded ? `rounded-${props.rounded}` : `rounded-md`,
  ];

  if (props.className) {
    classes.push(props.className);
  }

  switch (props.size) {
    case 'xs':
      classes.push('h-6 w-6');
      break;
    case 'sm':
      classes.push('h-8 w-8');
      break;
    case 'lg':
      classes.push('h-12 w-12');
      break;
    case 'xl':
      classes.push('h-14 w-14');
      break;
    case '2xl':
      classes.push('h-16 w-16');
      break;
    case 'md':
    default:
      classes.push('h-10 w-10');
      break;
  }

  return props.type === 'image' && props.src ? (
    <img className={classNames(...classes)} src={props.src} alt={props.alt} />
  ) : props.type === 'image' ? (
    <span className={classNames('bg-gray-100', 'overflow-hidden', ...classes)}>
      <svg
        className="h-full w-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  ) : (
    <span
      className={classNames(
        'inline-flex',
        'items-center',
        'justify-center',
        'bg-gray-500',
        ...classes
      )}
    >
      <span className="text-xs font-medium leading-none text-white">
        {props.initials}
      </span>
    </span>
  );
};
