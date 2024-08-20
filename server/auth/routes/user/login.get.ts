export default eventHandler((event) =>
  useSyncHandler({
    fn: () => {
      return useAuthContainer()
    },
  })
);
