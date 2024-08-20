export default eventHandler(async (event) => {
  const { $authUserService } = useAuthContainer();
  return $authUserService.getAll();
});
