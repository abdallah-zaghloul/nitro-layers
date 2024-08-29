import { env } from "./handler.config";

export default defineNitroConfig({
  srcDir: "server",
  scanDirs: ["app", "auth"],
  experimental: {
    asyncContext: true,
  },
  runtimeConfig: {
    app: {
      name: env.valid("APP_NAME", "string"),
    },
  },
});
