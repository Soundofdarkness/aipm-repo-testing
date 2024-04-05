import {collectModels, type Model} from "./ModelCollector.ts";
import * as path from "node:path";
import {registryDirectory} from "./Constants.ts";
import fs from "node:fs/promises";
import {pathExists} from "./util.ts";

async function generateRegistry(){
    const models = await collectModels();

    const modelInfo: ModelInfo[] = [];

    for (const model of models){
        const outputPath = getModelOutputPath(model);

        if(!await pathExists(outputPath.dir)){
            await fs.mkdir(outputPath.dir, { recursive: true});
        }

        if(await pathExists(outputPath.file)){
            await fs.unlink(outputPath.file);
        }
        await fs.symlink(model.path, outputPath.file);

        modelInfo.push(buildModelInfo(model));
        console.log(`Model ${model.metadata.meta.id}:${model.metadata.meta.tag} generated!`);
    }
    await Bun.write(path.resolve(registryDirectory, "models.json"), JSON.stringify(modelInfo));
    console.log("Finished !");
}

function buildModelInfo(model: Model): ModelInfo {
    return {
        name: model.metadata.meta.name,
        id: model.metadata.meta.id,
        tag: model.metadata.meta.tag,
        path: `/${model.metadata.meta.id}/${model.metadata.meta.tag}/Modelfile.toml`,
    }
}


function getModelOutputPath(model: Model): {dir: string, file: string} {
    const modelDirectory = path.resolve(path.join(registryDirectory, model.metadata.meta.id, model.metadata.meta.tag));
    const modelFilePath = path.resolve(path.join(modelDirectory, "Modelfile.toml"));
    return {dir: modelDirectory, file: modelFilePath}
}

type ModelInfo = {
    name: string,
    id: string,
    tag: string,
    path: string
}

export { generateRegistry };