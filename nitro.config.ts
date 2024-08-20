import { config as dotEnvConfig } from "dotenv";
import { useValidEnv } from "./server/app/utils/validator";

dotEnvConfig();
export default defineNitroConfig({
  srcDir: "server",
  scanDirs: ["app", "auth"],
  experimental: {
    asyncContext: true,
  },
  runtimeConfig: {
    app: {
      name: useValidEnv<string>("APP_NAME"),
    },
  },
});
