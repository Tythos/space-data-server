export interface PublicKeyVerification {
    publicKey: string,
    nonce: string,
    nonceSignature: string,
    publicKeyBuffer?: Buffer,
    ipnsCID?: string,
    ipfsPID?: string,
    ethAddress?: string,
}