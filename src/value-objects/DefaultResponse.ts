import * as HttpStatus from 'http-status-codes'
import { Request, Response} from 'express';
import { json } from 'body-parser'

export class DefaultResponse {

    success(res: Response, jsonData: any) {
        res.status(HttpStatus.OK).json(jsonData);
        return this;
    }

    error(res: Response, error: any, httpStatus = HttpStatus.BAD_REQUEST) {
        res.status(httpStatus).json(error);
        return this;
    }

    invalidParams(res: Response, errors: any) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(errors);
        return this;
    }
}