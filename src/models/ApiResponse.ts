export default interface ApiResponse<T> {
  data: T;
  count: number;
  error: string;
}