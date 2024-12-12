import { Navigate, useRouteError } from "react-router";
import { UnauthorizedError } from "@/errors/unauthorized-error";

export function ErrorPage() {
  const error = useRouteError();

  if (error instanceof UnauthorizedError) {
    return <Navigate to="/logout"/>;
  }

  return <div>
    <h1>Something went wrong</h1>
    <p>{error?.error?.toString() ?? error?.toString()}</p>
  </div>;
}