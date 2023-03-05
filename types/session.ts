import { Session, User } from 'next-auth';

export interface CustomSession extends Session {
  user?: User & {
    role?: string;
    firstName?: string;
    lastName?: string;
    hasUploadedDocuments?: boolean;
    isCompanyVerified?: boolean;
    isEmailVerified?: boolean;
  };
}
