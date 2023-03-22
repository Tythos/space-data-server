import { Settings, TrustedAddress } from "./settings.interface";

interface AuthHeader {
    trustedAddress?: TrustedAddress,
    nonce: Number,
}

export interface AuthCIDHeader extends AuthHeader {
    CID: string
}

export interface AuthSettingsHeader extends AuthHeader {
    Settings: Settings
}