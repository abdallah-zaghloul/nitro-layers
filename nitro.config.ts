import { config as dotEnvConfig } from "dotenv";
import validEnv from "./server/app/utils/valid-env";

dotEnvConfig();
export default defineNitroConfig({
  srcDir: "server",
  scanDirs: ["app"],
  experimental: {
    asyncContext: true,
  },
  runtimeConfig: {
    app: {
      name: validEnv<string>("APP_NAME"),
    },
  },
});
