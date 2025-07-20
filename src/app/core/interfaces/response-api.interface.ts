export interface ResponseAPI<T> {
    statusCode: string;
    data: T,
    message: string,
    success: boolean
}
