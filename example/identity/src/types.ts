export interface VerificationOptionTypes {
  allowDrivingLicense: boolean;
  allowPassport: boolean;
  allowIdentityCard: boolean;
  allowUploads: boolean;
  allowDocumentSelfie: boolean;
  allowIdNumberVerification: boolean;
}

export enum VerificationType {
  DOCUMENT = 'document',
  ID_NUMBER = 'id_number',
  SELFIE = 'document_and_selfie',
}

export enum AllowedType {
  DRIVING_LICENSE = 'driving_license',
  PASSPORT = 'passport',
  ID_CARD = 'id_card',
}

export interface VerificationCreateRequest {
  type: VerificationType;
  options: VerificationOptions;
}

export interface VerificationOptions {
  allow_uploads: boolean;
  id_number?: {};
  document?: { allowed: AllowedType[] };
  selfie?: {};
}
