export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): { message: string; statusCode: number } {
  if (error instanceof ApiError) {
    return { message: error.message, statusCode: error.statusCode };
  }
  
  if (error instanceof Error) {
    return { message: error.message, statusCode: 500 };
  }
  
  return { message: 'An unknown error occurred', statusCode: 500 };
}
