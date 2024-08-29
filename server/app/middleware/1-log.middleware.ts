export default eventHandler((event) => {
  event.context.log = "log";
  console.log("log middleware");
});
