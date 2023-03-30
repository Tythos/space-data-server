export interface PublicKeyVerification {
    publicKey: string,
    nonce: string,
    nonceSignature: string,
    ipnsCID?: string,
    ipfsPID?: string,
    ethAddress?: string,
}