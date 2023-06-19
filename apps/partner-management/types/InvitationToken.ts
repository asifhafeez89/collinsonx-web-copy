export interface InvitationToken {
  jti: string; // The id of the invitation
  exp: string;
  audience: string;
  issuer: string;
  subject: string;
  userType: string;
  experienceID: string; // the experience id
}
