import crypto from 'crypto';

export const classNames = (...classes: string[]) =>
  classes.filter(Boolean).join(' ');

export const getGravatarImageUrl = (email: string) => {
  const md5 = crypto.createHash('md5').update(email).digest('hex');
  return `https://www.gravatar.com/avatar/${md5}?d=mp`;
};
