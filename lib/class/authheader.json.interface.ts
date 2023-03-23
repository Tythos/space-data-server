import { Settings, TrustedAddress } from "./settings.interface";

interface AuthHeader {
    trustedAddress?: TrustedAddress,
    nonce: number,
}

export interface AuthCIDHeader extends AuthHeader {
    CID: string
}

export interface AuthSettingsHeader extends AuthHeader {
    Settings: Settings
}