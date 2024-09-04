import { asClass, ContainerOptions, createContainer } from "awilix";

// Utility function to create and resolve a singleton container
export function useSingletonContainer<D extends Dependencies>({
  dependencies,
  containerOptions = {
    injectionMode: "CLASSIC",
    strict: true,
  },
}: {
  dependencies: D;
  containerOptions?: ContainerOptions;
}): Singleton<D> {
  // Create the Awilix container
  const container = createContainer<D>(containerOptions);

  // Register each dependency as a singleton
  for (const name in dependencies) {
    container.register(name, asClass(dependencies[name]).singleton());
  }

  // Resolve each dependency as a singleton
  for (const name in dependencies) {
    dependencies[name] = container.resolve(name);
  }

  // Return the resolved instances
  return dependencies as Singleton<D>;
}
