import { z } from "zod";

export default eventHandler((event) =>
  useAsyncHandler({
    fn: () => "login",
  })
);
