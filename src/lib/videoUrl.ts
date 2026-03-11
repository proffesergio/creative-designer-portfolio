const VIDEO_BASE_URL = process.env.NEXT_PUBLIC_VIDEO_BASE_URL || '/videos';

export const getVideoUrl = (path: string): string => {
  if (!path) return '';

  if (path.startsWith('http')) return path;

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${VIDEO_BASE_URL}${cleanPath ? '/' + cleanPath : ''}`;
};

export const getVideoUrlFromRelative = (relativePath: string): string => {
  if (!relativePath) return '';

  if (relativePath.startsWith('http')) return relativePath;

  return `${VIDEO_BASE_URL}/${relativePath}`;
};
