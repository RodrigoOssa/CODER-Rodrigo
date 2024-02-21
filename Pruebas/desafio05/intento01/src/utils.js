import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";

/* const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url); */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)


export default { __dirname };