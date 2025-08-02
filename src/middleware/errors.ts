import { Request, Response, NextFunction } from "express";

export class HttpError extends Error {
  constructor(
    public name: string,
    message: string,
    public status: number
  ) {
    super(message);
  }
}

export const globalErrorHandler = (
  err: HttpError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(`Timestamp: ${new Date().toISOString()}`);
    console.error("Error:", err);
  }

  const responseStatus = err instanceof HttpError ? err.status : 500;
  res.status(responseStatus).json({
    error: {
      name: err.name,
      message: err.message
    }
  });
};

export const endpointNotImplemented = (_req: Request, _res: Response, next: NextFunction) => {
  next(new HttpError("NotImplementedError", "Endpoint not implemented", 501));
};
