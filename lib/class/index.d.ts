import { AuthCIDHeader, AuthSettingsHeader } from '../class/authheader.json.interface';

declare module 'express' {
  export interface Request {
    authHeader?: AuthCIDHeader | AuthSettingsHeader;
  }
}