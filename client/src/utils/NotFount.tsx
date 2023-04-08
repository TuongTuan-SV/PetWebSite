import { useRouteError } from 'react-router-dom';

export default function NotFound() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" style={{ marginTop: '100px' }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
