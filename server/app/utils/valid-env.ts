import { z, ZodTypeAny } from "zod";

export default function validEnv<T = string>(
  name: string,
  value?: T,
  schema?: ZodTypeAny
) {
  schema ??= z.string().min(1);
  value ??= process.env[name] as T;
  const res = schema.safeParse(value);

  if (!res.success)
    throw new Error(
      [
        `Please check your process.env.${name} :`,
        ...res.error.flatten().formErrors,
      ].join("\n")
    );

  return res.data as T;
}
