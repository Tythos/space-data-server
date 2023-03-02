import { ethers } from "hardhat";
import { expect } from "chai";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { TrustMapping } from "../typechain-types";

describe("TrustMapping", function () {
  let trustMapping: TrustMapping;
  let signer1: SignerWithAddress;
  let signer2: SignerWithAddress;
  let signer3: SignerWithAddress;
  let signer4: SignerWithAddress;

  beforeEach(async function () {
    const TrustMapping = await ethers.getContractFactory("TrustMapping");
    trustMapping = await TrustMapping.deploy();
    await trustMapping.deployed();

    [signer1, signer2, signer3, signer4] = await ethers.getSigners();
    await trustMapping.connect(signer1).setTrust(signer2.address, 100);

  });

  it("should set trust level", async function () {
    const trustLevel = 100;
    //Try again for idempotence
    await trustMapping.connect(signer1).setTrust(signer2.address, trustLevel);
    await trustMapping.connect(signer1).setTrust(signer3.address, trustLevel);
    await trustMapping.connect(signer1).setTrust(signer4.address, trustLevel);

    const storedTrustLevel = await trustMapping
      .connect(signer1)
      .getTrust(signer1.address, signer2.address);
    expect(storedTrustLevel).to.equal(trustLevel);

    const trustedPartyLength = await trustMapping.connect(signer1).getCount(signer1.address);
    expect(trustedPartyLength).to.equal(3);

    const relationships = await trustMapping.getRelationships(signer1.address);
    expect(relationships[0]).to.equal(signer2.address);
    expect(relationships[1]).to.equal(signer3.address);
    expect(relationships[2]).to.equal(signer4.address);
  });

  it("returns a list of secondary keys for the primary key", async function () {
    //Only have original from "beforeEach"
    const relationships = await trustMapping.getRelationships(signer1.address);
    expect(relationships).to.have.lengthOf(1);
    expect(relationships[0]).to.equal(signer2.address);
  });

  it("returns an empty list if the primary key has no secondary keys", async function () {
    const relationships = await trustMapping.getRelationships("0x4444444444444444444444444444444444444444");

    expect(relationships).to.have.lengthOf(0);
  });

  it("should delete trust level", async function () {
    const trustedParty = signer2.address;
    const trustLevel = 0;

    await trustMapping.connect(signer1).setTrust(trustedParty, trustLevel);

    const storedTrustLevel = await trustMapping
      .connect(signer1)
      .getTrust(signer1.address, trustedParty);
    expect(storedTrustLevel).to.equal(0);
  });
});