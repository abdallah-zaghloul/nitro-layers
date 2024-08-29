export default defineRequestMiddleware((event) => {
  event.context.auth = "auth";
  console.log("auth middleware");
});
