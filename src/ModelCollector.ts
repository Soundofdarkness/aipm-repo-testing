import fs from "node:fs/promises";
import {modelDirectory} from "./Constants.ts";
import {type ModelFile, ModelFileSchema} from "./ModelFile.ts";
import * as path from "node:path";

async function collectModels(): Promise<Model[]> {

    const modelDirectoryEntries = await fs.readdir(modelDirectory, { recursive: true, withFileTypes: true });

    const modelFilePaths = modelDirectoryEntries.filter(entry => entry.isFile() && entry.name.endsWith(".toml"));

    const models: Model[] = [];

    for (const modelFilePath of modelFilePaths) {
        try {
            const modelFileAbsolutePath = path.resolve(modelDirectory, modelFilePath.name);
            const modelFileRaw = await import(modelFileAbsolutePath);
            const modelFile = await ModelFileSchema.parseAsync(modelFileRaw);
            const model: Model = { path: modelFileAbsolutePath, metadata: modelFile };
            models.push(model);
        }
        catch (ex){
            console.error("Encountered error while loading model file", ex);
        }
    }
    return models;
}


type Model = {
    path: string,
    metadata: ModelFile
}

export { collectModels };
export type { Model };