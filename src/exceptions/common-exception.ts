import {CustomException} from './custom-exception'

export class InvalidRequestPayloadException extends CustomException{

    constructor(message:string){
        super(412,message)
    }
}

export class UnSupportedMediaTypeException extends CustomException{

    constructor(message:string){
        super(415,message)
    }
}