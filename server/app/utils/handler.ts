import { H3Event } from "h3";
import { MimeType } from "h3";

export const DEFAULT_ERROR_STATUS = {
  UNPROCESSABLE_ENTITY: {
    statusCode: 422,
    statusMessage: "Unprocessable Entity",
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    statusMessage: "Sorry we are solving some issues, please try again later.",
  },
  BAD_REQUEST: {
    statusCode: 400,
    statusMessage: "Please insert a valid data.",
  },
  NOT_FOUND: {
    statusCode: 404,
    statusMessage: "Not found",
  },
};

export const DEFAULT_RESPONSE_STATUS = {
  SUCCESS: {
    statusCode: 200,
    statusMessage: "Success",
  },
  NO_CONTENT: {
    statusCode: 204,
    statusMessage: "No Content",
  },
};

export function useSendError({
  httpStatus,
  data,
  event = useEvent(),
  type = "application/json",
}: {
  httpStatus: HttpErrorStatusName | HttpStatusObject;
  event?: H3Event;
  data?: any;
  type?: MimeType;
}) {
  if (typeof httpStatus === "string")
    httpStatus = DEFAULT_ERROR_STATUS[httpStatus];

  event.node.res.statusCode = httpStatus.statusCode;
  event.node.res.statusMessage = httpStatus.statusMessage;
  event.node.res.setHeader("Content-Type", type);
  type === "application/json"
    ? event.node.res.end(JSON.stringify(data))
    : event.node.res.end(data);

  sendError(
    event,
    createError({
      statusCode: httpStatus.statusCode,
      statusMessage: httpStatus.statusMessage,
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
  httpStatus?: HttpResponseStatusName | HttpStatusObject;
  data?: any;
  event?: H3Event;
  type?: MimeType;
}) {
  if (typeof httpStatus === "string")
    httpStatus = DEFAULT_RESPONSE_STATUS[httpStatus];

  event.node.res.statusCode = httpStatus.statusCode;
  event.node.res.statusMessage = httpStatus.statusMessage;
  event.node.res.setHeader("Content-Type", type);
  send(event, data, type);
  return type === "application/json"
    ? event.node.res.end(JSON.stringify(data))
    : event.node.res.end(data);
}

export function useSyncHandler({
  fn,
  catcher,
}: {
  fn: () => any;
  catcher?: Function;
}) {
  try {
    return fn();
  } catch (err) {
    return catcher
      ? catcher()
      : useSendError({ httpStatus: "INTERNAL_SERVER_ERROR" });
  }
}

export async function useAsyncHandler({
  fn,
  catcher,
}: {
  fn: () => any;
  catcher?: Function;
}) {
  try {
    return await fn();
  } catch (err) {
    return catcher
      ? catcher()
      : useSendError({ httpStatus: "INTERNAL_SERVER_ERROR" });
  }
}
