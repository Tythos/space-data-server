import { JSONSchema4 } from "json-schema";

export const resolver = (prop: JSONSchema4, jsonSchema: JSONSchema4): JSONSchema4 => {
    if(!prop) return {};
    prop = prop?.items || prop;
    let { $ref, $$ref } = prop;
    if ($ref) {
        let rpath = $ref.split("/").slice(1);
        let fprop = jsonSchema;
        for (let i = 0; i < rpath.length; i++) {
            try {
                fprop = fprop[rpath[i]];
            } catch (e) {
                console.log(fprop);
            }
        }
        fprop.$$ref = $ref || $$ref;
        return resolver(fprop, jsonSchema);
    } else {
        return prop;
    }
};