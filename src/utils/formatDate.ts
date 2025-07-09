import dayjs from 'dayjs';

export const formatDate = (isoString: string | null | undefined): string => {
  if (!isoString) return '';
  const date = dayjs(isoString);

  return `${date.month() + 1}/${date.date()}`;
};
