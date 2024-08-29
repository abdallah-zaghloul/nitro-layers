import authRequest from "~/app/request/auth.request";
import mobileResponse from "~/app/response/mobile.response";

export default eventHandler({
  onRequest: [authRequest],
  handler: useHandler({
    fn(event) {
      console.log(event.context);
      return "hello";
    },
  }),
  onBeforeResponse: mobileResponse,
});
