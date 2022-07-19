import { InvalidRequestPayloadException, UnSupportedMediaTypeException } from "../exceptions/common-exception";
import { PatientRequestModel } from "../types/patient-creation.model";
import { MediaTypes, RequestHeaders } from "../utilities/request-constants";
import {Request} from "express";
import format from "string-format";

export const validateRequestHeaderForMediaTypeApplicationJson = (incomingRequest: Request): Error | void => {

    const incomingHttpHeader = incomingRequest.headers[RequestHeaders.CONTENT_TYPE];
  
    if (incomingRequest.headers[RequestHeaders.CONTENT_TYPE] !== MediaTypes.APPLICATION_JSON) {
      throw new UnSupportedMediaTypeException(
        format(
          "UnSupported Header '{}' on URL '{}'. Must use '{}'",
          String(incomingHttpHeader),
          incomingRequest.originalUrl,
          MediaTypes.APPLICATION_JSON
        )
      );
    }
  };

export const validateRequestBodyForEmptyJsonObject = <T>(
    requestBodyType: T
  ): InvalidRequestPayloadException | void => {
  
    if (Object.keys(requestBodyType).length === 0) {
      throw new InvalidRequestPayloadException(
        "Invalid Payload - Received Empty JSON Object payload in request body is not allowed"
      );
    }
  };

export const validateRequestBodyForJsonArray = <T>(
    requestBodyType: T
  ): InvalidRequestPayloadException | void => {
  
    if (Array.isArray(requestBodyType)) {
      throw new InvalidRequestPayloadException(
        "Invalid Payload - cannot be of type Array. It must be of type object with corresponding key-value pairs"
      );
    }
  };

export const validatePrerequisiteForAPI = <T>(requestBodyType: T): Error | void => {

    validateRequestBodyForJsonArray<T>(
      requestBodyType
    );
  
    validateRequestBodyForEmptyJsonObject<T>(
      requestBodyType
    );
  
  };

export const validatePrerequisiteForPatientCreation = (incomingRequest: Request): Error | void => {

    validateRequestHeaderForMediaTypeApplicationJson(incomingRequest);
  
    validatePrerequisiteForAPI<PatientRequestModel>(incomingRequest.body);
  };