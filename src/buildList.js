const { version } = require("../package.json");
const mainnet = require("./tokens/mainnet.json");
const goerli = require("./tokens/goerli.json");
const kovan = require("./tokens/kovan.json");
const matic = require("./tokens/matic.json");
const rinkeby = require("./tokens/rinkeby.json");
const ropsten = require("./tokens/ropsten.json");

module.exports = function buildList() {
  const parsed = version.split(".");
  return {
    name: "Manekiswap List",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI: "ipfs://Qmc1xbWhECo1FDW9QUfdayFL5nfbgi7PKtatjXMgAc2XcT",
    keywords: ["manekiswap", "default"],
    tokens: [...mainnet, ...goerli, ...kovan, ...matic, ...ropsten, ...rinkeby]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      }),
  };
};
