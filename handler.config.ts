import { config as dotEnvConfig } from "dotenv";
import { z, ZodTypeAny } from "zod";

dotEnvConfig();

type EnvType = {
  string: string;
  number: number;
  array: string[];
};

export class env {
  private static match(name: string, type: keyof EnvType) {
    const envTypes = {
      string: {
        value: () => process.env[name],
        schema: z.string().min(1),
      },
      number: {
        value: () => Number(process.env[name]),
        schema: z.number(),
      },
      array: {
        value: () => process.env[name].split(","),
        schema: z.array(z.string().min(1)).min(1),
      },
    };
    //match type
    return envTypes[type];
  }

  public static get<T extends keyof EnvType>(name: string, type: T) {
    return this.match(name, type).value() as EnvType[T];
  }

  public static valid<T extends keyof EnvType>(
    name: string,
    type: T,
    schema?: ZodTypeAny
  ): EnvType[T] {
    const env = this.match(name, type);
    const res = (schema ?? env.schema).safeParse(env.value());

    if (!res.success)
      throw new Error(
        [
          `Please check your process.env.${name} :`,
          ...res.error.flatten().formErrors,
        ].join("\n")
      );

    return res.data;
  }
}
