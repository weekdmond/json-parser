import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

export const formatJson = (input: string): string => {
    try {
        const parsed = JSON.parse(input);
        return JSON.stringify(parsed, null, 2);
    } catch (e) {
        throw new Error("Invalid JSON");
    }
};

export const minifyJson = (input: string): string => {
    try {
        const parsed = JSON.parse(input);
        return JSON.stringify(parsed);
    } catch (e) {
        throw new Error("Invalid JSON");
    }
};

export const validateJson = (input: string): boolean => {
    try {
        JSON.parse(input);
        return true;
    } catch (e) {
        return false;
    }
};

export const validateWithSchema = (json: string, schema: string): string | null => {
    try {
        const parsedJson = JSON.parse(json);
        const parsedSchema = JSON.parse(schema);
        const validate = ajv.compile(parsedSchema);
        const valid = validate(parsedJson);
        if (!valid) {
            return validate.errors?.map((err) => `${err.instancePath} ${err.message}`).join(", ") || "Validation failed";
        }
        return null;
    } catch (e) {
        return (e as Error).message;
    }
};
