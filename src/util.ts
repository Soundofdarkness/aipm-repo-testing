import fs from "node:fs/promises";

async function pathExists(path: string): Promise<boolean> {
    try {
        await fs.lstat(path);
        return true;
    }
    catch(ex) {
        console.log(ex);
        return false;
    }
}

export { pathExists };