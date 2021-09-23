/**
 * @flow strict-local
 * @format
 */
("use strict");
import path from "path";

import codeGen, { type TypeSystem } from "./CodeGen.js";
import { exists, copyFile } from "fs";

const typeSystem = process.argv[2];
const moduleName = process.argv[3] || "people";

const schemas = {
  ts: "./schema/typescriptSchema.ts",
  flow: `./schema/${moduleName}.js`,
};

if (!typeSystem) {
  throw new Error("ERROR: argument expected(flow/ts) but not found");
}
if (typeSystem !== "ts" && typeSystem !== "flow") {
  throw new Error("ERROR: Invalid type system specified in the argument");
}

const schemaInPath = path.resolve(schemas[typeSystem]);
const outPath = path.resolve("./generated");

// File destination.txt will be created or overwritten by default.
copyFile("./schema/flowSchema.js", `./schema/${moduleName}.js`, undefined, (err) => {
  if (err) throw err;

  codeGen(
    moduleName,
    schemaInPath,
    ["cpp", "h", "java", "jni_cpp", "jni_h"],
    outPath,
    typeSystem
  );  
})