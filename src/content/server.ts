const CURRENT_URL = `${window.location.protocol}//${window.location.hostname}`;

export const SERVER_URL = ['localhost', 'www.btn0s.dev'].includes(
  window.location.hostname,
)
  ? process.env.NEXT_PUBLIC_API_URL
  : `${CURRENT_URL}:8080`;
