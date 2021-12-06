import { getAddress } from "@ethersproject/address";
import Ajv from "ajv";
import addFormats from "ajv-formats";

import { buildList } from "../src/buildList";

const schema = require("@manekiswap/token-lists/dist/tokenlist.schema.json");

const packageJson = require("../package.json");
const mainnet = require("../src/tokens/default/mainnet.json");
const goerli = require("../src/tokens/default/goerli.json");
const kovan = require("../src/tokens/default/kovan.json");
const matic = require("../src/tokens/default/matic.json");
const rinkeby = require("../src/tokens/default/rinkeby.json");
const ropsten = require("../src/tokens/default/ropsten.json");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validator = ajv.compile(schema);

describe("buildList", () => {
  const defaultTokenList = buildList("Test List", [
    ...mainnet,
    ...goerli,
    ...kovan,
    ...matic,
    ...ropsten,
    ...rinkeby,
  ]);

  it("validates", () => {
    expect(validator(defaultTokenList)).toEqual(true);
  });

  it("contains no duplicate addresses", () => {
    const map = {};
    for (let token of defaultTokenList.tokens) {
      const key = `${token.chainId}-${token.address}`;
      expect(typeof map[key]).toEqual("undefined");
      map[key] = true;
    }
  });

  it("contains no duplicate symbols", () => {
    const map = {};
    for (let token of defaultTokenList.tokens) {
      const key = `${token.chainId}-${token.symbol.toLowerCase()}`;
      expect(typeof map[key]).toEqual("undefined");
      map[key] = true;
    }
  });

  it("contains no duplicate names", () => {
    const map = {};
    for (let token of defaultTokenList.tokens) {
      const key = `${token.chainId}-${token.name.toLowerCase()}`;
      expect(typeof map[key]).toEqual("undefined");
      map[key] = true;
    }
  });

  it("all addresses are valid and checksummed", () => {
    for (let token of defaultTokenList.tokens) {
      expect(getAddress(token.address)).toEqual(token.address);
    }
  });

  it("version matches package.json", () => {
    expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(packageJson.version).toEqual(
      `${defaultTokenList.version.major}.${defaultTokenList.version.minor}.${defaultTokenList.version.patch}`
    );
  });
});
