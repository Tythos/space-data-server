export interface ipfsIDs {
    ipnsCID?: string,
    ipfsCID?: string,
    ipfsPID?: string,
}

export interface PublicKeyVerification extends ipfsIDs {
    publicKey: string,
    nonce: string,
    nonceSignature: string,
    publicKeyBuffer?: Buffer,
    ethAddress?: string,
}