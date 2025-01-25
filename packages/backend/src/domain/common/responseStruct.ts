export interface ResponseStruct<T = unknown> {
  statusCode: number;
  message: string;
  data?: T;
  error: string;
}
