import { Settings, TrustedAddress } from "./settings.interface";

export interface AuthHeader {
    trustedAddress?: TrustedAddress,
    nonce: number,
}

export interface AuthCIDHeader extends AuthHeader {
    CID: string
}

export interface AuthSettingsHeader extends AuthHeader {
    Settings: Settings
}

declare module 'express' {
    export interface Request {
        authHeader?: AuthCIDHeader | AuthSettingsHeader;
    }
}

export interface encryptedMessage {
    message: string;
}