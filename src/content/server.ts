const CURRENT_URL = `${window.location.protocol}//${window.location.hostname}`;

export const SERVER_URL =
  window.location.hostname === 'localhost' ||
  window.location.hostname === 'btn0s.dev'
    ? process.env.NEXT_PUBLIC_API_URL
    : `${CURRENT_URL}:8080`;
