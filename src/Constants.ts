import * as path from "node:path";

const rootDirectory = path.resolve(import.meta.dir, "..");

const modelDirectory = path.resolve(rootDirectory, "models");

const registryDirectory = path.resolve(rootDirectory, "registry");

export { modelDirectory, registryDirectory, rootDirectory };