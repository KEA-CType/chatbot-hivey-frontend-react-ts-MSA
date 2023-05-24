export interface CommonResponse<T> {
    isSuccess: boolean;
    code: number;
    message: string;
    result: Result<T>
}

interface Result<T>{
    result: T;
}
