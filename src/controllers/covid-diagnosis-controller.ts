import {Consumes, Produces, Response, Tags} from "typescript-rest-swagger";
import {
  ContextRequest,
  ContextResponse,
  DELETE,
  FileParam,
  GET,
  PATCH,
  Path,
  PathParam,
  POST,
  PreProcessor,
} from "typescript-rest";
import express from "express";
import { GlobalExceptionResponse } from "../types/error-response.model";
import { PatientCreationSuccessResponse ,
    PatientRequestModel} from "../types/patient-creation.model";
import { validatePrerequisiteForPatientCreation } from "../validations/request-header-validation";
import { createPatient } from "../services/patient-service";

@Tags("covid_diagnosis")
@Path("api/v1/covid_diagnosis")
@Produces("application/json")
@Consumes("application/json")

export class covidDiagnosisController{
    @Response<PatientCreationSuccessResponse>(
        201,
        "New Patient is created and new Patient ID is returned.",
        {
          patientId: "p-1",
        }
      )
      @Response<void>(204, "Not applicable.")
      @Response<GlobalExceptionResponse>(
        400,
        "It returns the corresponding error if data is missing in the payload.",
        {
          errorMessage:
            "Received Payload is invalid and does not meet the" +
            " request format required for new Patient Creation",
          statusCode: 400,
        }
      )
      @Response<GlobalExceptionResponse>(
        500,
        "It returns the corresponding error if the server encounters an unexpected condition that prevents it from fulfilling the request.",
        {
          errorMessage:
            "Server has encountered an problem while processing your" + " request",
          statusCode: 500,
        }
      )
      @Response<GlobalExceptionResponse>(
        422,
        "It returns the corresponding error if data in invalid.",
        {
          errorMessage:
            "Received payload does not comply with Patient Creation payload",
          statusCode: 422,
        }
      )
      @PreProcessor(validatePrerequisiteForPatientCreation)
      @POST
      public async NewPatientCreation(
        @ContextRequest request: express.Request,
        @ContextResponse response: express.Response,
          PatientRequestModel: PatientRequestModel
      ): Promise<void> {
        const userResponse = createPatient 
    
        response.status(201).json(userResponse);
      }
    
}