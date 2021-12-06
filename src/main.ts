import { TokenInfo } from "@manekiswap/token-lists";
import fse from "fs-extra";
import path from "path";
import { buildList } from "./buildList";

function getListName(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1) + ' List'
}

(async function () {
  const tokenPath = path.resolve('src', 'tokens');
  const dirs = await fse.readdir(tokenPath);

  for (const dirName of dirs) {
    const listPath = path.resolve('src', 'tokens', dirName);
    const files = await fse.readdir(listPath);

    let tokenList: TokenInfo[] = []
    for (const file of files) {
      const filePath = path.resolve('src', 'tokens', listPath, file);
      const list = JSON.parse(fse.readFileSync(filePath, 'utf8'));
      tokenList = [...tokenList, ...list]
    }

    const result = buildList(getListName(dirName), tokenList)

    const distPath = path.resolve('build', `manekiswap-${dirName}.tokenlist.json`);
    await fse.writeFile(distPath, JSON.stringify(result, null, 2))
  }
})();
