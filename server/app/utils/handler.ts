import { H3Event } from "h3";
import { MimeType } from "h3";

export const DEFAULT_ERROR_STATUS = {
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
};

export const DEFAULT_RESPONSE_STATUS = {
  SUCCESS: 200,
  NO_CONTENT: 204,
};

export function useSendError({
  httpStatus,
  data,
  event = useEvent(),
  type = "application/json",
}: {
  httpStatus: HttpErrorStatus;
  event?: H3Event;
  data?: any;
  type?: MimeType;
}) {
  event.node.res.statusCode = DEFAULT_ERROR_STATUS[httpStatus];
  event.node.res.setHeader("Content-Type", type);
  type === "application/json"
    ? event.node.res.end(JSON.stringify(data))
    : event.node.res.end(data);

  sendError(
    event,
    createError({
      statusCode: DEFAULT_ERROR_STATUS[httpStatus],
      data,
    })
  );

  throw data;
}

export function useSendResponse({
  httpStatus = "SUCCESS",
  data,
  event = useEvent(),
  type = "application/json",
}: {
  httpStatus?: HttpResponseStatus;
  data?: any;
  event?: H3Event;
  type?: MimeType;
}) {
  event.node.res.statusCode = DEFAULT_RESPONSE_STATUS[httpStatus];
  event.node.res.setHeader("Content-Type", type);
  send(event, data, type);
  return type === "application/json"
    ? event.node.res.end(JSON.stringify(data))
    : event.node.res.end(data);
}

export function useCatcher({
  fn,
  catcher,
}: {
  fn: (...args: any[]) => any;
  catcher?: (...args: any[]) => any;
}) {
  try {
    return fn();
  } catch (err) {
    return catcher
      ? catcher()
      : useSendError({ httpStatus: "INTERNAL_SERVER_ERROR" });
  }
}

export async function useAsyncCatcher({
  fn,
  catcher,
}: {
  fn: (...args: any[]) => any;
  catcher?: (...args: any[]) => any;
}) {
  try {
    return await fn();
  } catch (err) {
    return catcher
      ? catcher()
      : useSendError({ httpStatus: "INTERNAL_SERVER_ERROR" });
  }
}

export function useHandler({
  fn,
  catcher,
}: {
  fn: (event: H3Event) => any;
  catcher?: (...args: any[]) => any;
}) {
  return (event: H3Event) => useAsyncCatcher({ fn: () => fn(event), catcher });
}
