import {GlobalExceptionResponse} from "../types/error-response.model";

export abstract class CustomException extends Error {

  protected readonly _statusCode: number;
  protected readonly _errorMessage: string;

  protected constructor(statusCode: number, message: string) {
    super(message);
    this._errorMessage = message;
    this._statusCode = statusCode;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  serializeErrors(): Readonly<GlobalExceptionResponse> {
    return Object.freeze(
      {
        statusCode: this._statusCode,
        errorMessage: this._errorMessage
      }
    );
  }
}