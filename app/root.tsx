import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type {Route} from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  {rel: "preconnect", href: "https://fonts.googleapis.com"},
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "prefetch",
    href: "../node_modules/preline/dist/preline.js",
  },
];

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="../node_modules/preline/dist/preline.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          const html = document.querySelector('html'); const isLightOrAuto =
          localStorage.getItem('hs_theme') === 'light' ||
          (localStorage.getItem('hs_theme') === 'auto' &&
          !window.matchMedia('(prefers-color-scheme: dark)').matches); const
          isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' ||
          (localStorage.getItem('hs_theme') === 'auto' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches); if
          (isLightOrAuto && html.classList.contains('dark'))
          html.classList.remove('dark'); else if (isDarkOrAuto &&
          html.classList.contains('light')) html.classList.remove('light'); else
          if (isDarkOrAuto && !html.classList.contains('dark'))
          html.classList.add('dark'); else if (isLightOrAuto &&
          !html.classList.contains('light')) html.classList.add('light'); `,
          }}
        ></script>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
