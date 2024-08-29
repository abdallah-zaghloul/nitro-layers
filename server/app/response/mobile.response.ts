export default defineResponseMiddleware((event, res) => {
  res.body = {
    statusCode: event.node.res.statusCode,
    data: res.body,
  };
});
