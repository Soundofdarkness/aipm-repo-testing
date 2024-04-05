import { z } from "zod";

const ModelFileSchema = z.object({
    manifest_version: z.string().optional().default("0.0.1"),

    meta: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        tag: z.string(),
        license: z.string(),
        repository: z.string(),
    }),

    download: z.object({
        file_url: z.string().url("Not a valid url !"),
        hash: z.string().length(64, "Hash is not 64 characters long. Format: SHA256"),
        file_name: z.string()
    })
});

type ModelFile = z.infer<typeof ModelFileSchema>;

export {ModelFileSchema};
export type { ModelFile };
