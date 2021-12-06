import { TokenInfo } from "@manekiswap/token-lists";

const { version } = require("../package.json");

export function buildList(name: string, list: TokenInfo[]) {
  const parsed = version.split(".");
  return {
    name,
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "ipfs://Qmc1xbWhECo1FDW9QUfdayFL5nfbgi7PKtatjXMgAc2XcT",
    keywords: ["manekiswap", "default"],
    tokens: list
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  };
}
