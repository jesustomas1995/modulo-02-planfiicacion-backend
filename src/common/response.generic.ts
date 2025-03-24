export class GenericResponse<T> {
  statusCode: number;
  message: string;
  data?: T;
  error?: boolean;

  constructor({
    statusCode,
    message,
    data,
    error,
  }: {
    statusCode: number;
    message: string;
    data?: T;
    error?: boolean;
  }) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}
