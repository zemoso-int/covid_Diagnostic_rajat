export type PatientCreationSuccessResponse = {
    patientId: string;
}

export type PatientRequestModel = {
    name: string;
    age: number;
    gender: string;
    address: {
        house_no: string;
        street: string;
        area: string;
        city: string;
        state: string;
    }
}