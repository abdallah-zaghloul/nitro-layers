import { z, ZodTypeAny } from "zod";
import { H3Event } from "h3";

function parse(schema: ZodTypeAny, data: any) {
  const res = schema.safeParse(data);
  return res.success
    ? res.data
    : useSendError({
        data: res.error.flatten().fieldErrors,
        httpStatus: "UNPROCESSABLE_ENTITY",
      });
}

export function useValidator(event: H3Event = useEvent()) {
  return {
    parse,
    reqBody: async (schema: ZodTypeAny) => parse(schema, await readBody(event)),
    reqQuery: (schema: ZodTypeAny) => parse(schema, getQuery(event)),
    routeParam: (schema: ZodTypeAny, name: string) =>
      parse(schema, getRouterParam(event, name)),
  };
}

export function useValidEnv<T = string>(
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
