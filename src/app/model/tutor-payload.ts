import { FileUplodVM } from './course-payload'

export class TutorPayload {
    instructorId: string | undefined;
    userName: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    middleName: string | undefined;
    fullName: string | undefined;
    homePhone: string | undefined;
    mobilePhone: string | undefined;
    emailAddress: string | undefined;
    streetAddress1: string | undefined;
    streetAddress2: string | undefined;
    city: string | undefined;
    state: string | undefined;
    country:string | undefined;
    zipCode: string | undefined;
    education: string | undefined;
    educationTxt: string | undefined;
    occupation: string | undefined;
    occupationTxt: string | undefined;
    experience: string | undefined;
    experienceTxt: string | undefined;
    preference: string | undefined;
    taxId: string | undefined;
    dob: string | undefined;
    courseCount: string | undefined;
    description: string | undefined;
    avatar: FileUplodVM | undefined;
  }