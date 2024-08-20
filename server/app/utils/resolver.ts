export function useResolver<
  C extends Record<string, new (...args: any[]) => any>,
  K extends keyof C
>(
  container: Container<C>,
  instanceName: K,
  ...args: ConstructorParams<C[K]>
): InstanceTypeFromConstructor<C[K]> {
  // Get the class constructor or instance from the container
  const item = container[instanceName];

  // Check if the item is an instance
  if (useCheck().isInstance(item)) {
    // If an instance already exists, return it
    return item as InstanceTypeFromConstructor<C[K]>;
  }

  // Check if the item is a class constructor
  if (useCheck().isClassConstructor(item)) {
    // Get the class constructor
    const ClassOfInstance = item as new (
      ...args: ConstructorParams<C[K]>
    ) => InstanceTypeFromConstructor<C[K]>;

    // Create a new instance with the provided arguments
    const newInstance = new ClassOfInstance(...args);

    // Store the new instance in the container
    container[instanceName] = newInstance;
    return newInstance;
  }

  throw new Error(`Invalid item in container: ${String(instanceName)}`);
}
