import { H3Event } from "h3";
import { MimeType } from "h3";

export const defaultErrorStatus = {
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

export const defaultResponseStatus = {
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
  event = useEvent(),
  data,
  httpStatus,
}: {
  event?: H3Event;
  data?: any;
  httpStatus: HttpErrorStatusName | HttpStatusObject;
}) {
  if (typeof httpStatus === "string")
    httpStatus = defaultErrorStatus[httpStatus];

  const error = createError({
    statusCode: httpStatus.statusCode,
    statusMessage: httpStatus.statusMessage,
    data: data,
  });

  sendError(event, error);
  throw error;
}

export function useSendResponse({
  event = useEvent(),
  data,
  httpStatus = "SUCCESS",
  type = "application/json",
}: {
  event?: H3Event;
  data?: any;
  httpStatus?: HttpResponseStatusName | HttpStatusObject;
  type?: MimeType;
}) {
  if (typeof httpStatus === "string")
    httpStatus = defaultResponseStatus[httpStatus];

  return send(
    event,
    {
      statusCode: httpStatus.statusCode,
      statusMessage: httpStatus.statusMessage,
      data: data,
    },
    type
  );
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
