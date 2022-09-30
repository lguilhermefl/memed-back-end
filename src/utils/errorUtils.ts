type AppErrorTypes =
  | "bad_request"
  | "unauthorized"
  | "not_found"
  | "conflict"
  | "unprocessable_entry";

export interface AppError {
  type: AppErrorTypes;
  message?: string;
}

export function isAppError(error: object): error is AppError {
  return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: AppErrorTypes) {
  if (type === "unauthorized") return 401;
  if (type === "not_found") return 404;
  if (type === "conflict") return 409;
  if (type === "unprocessable_entry") return 422;

  return 400;
}

export function badRequestError(message?: string): AppError {
  return { type: "bad_request", message };
}

export function unauthorizedError(message?: string): AppError {
  return { type: "unauthorized", message };
}

export function notFoundError(message?: string): AppError {
  return { type: "not_found", message };
}

export function conflictError(message?: string): AppError {
  return { type: "conflict", message };
}

export function unprocessableEntry(message?: string): AppError {
  return { type: "unprocessable_entry", message };
}
