// Type guard to check if a value is a class constructor
function isClassConstructor<T>(value: any): value is new (...args: any[]) => T {
  return (
    typeof value === "function" &&
    value.prototype &&
    value.prototype.constructor === value
  );
}

// Type guard to check if a value is an instance
function isInstance<T>(value: any): value is T {
  return (
    value &&
    typeof value === "object" &&
    value.constructor &&
    typeof value.constructor === "function"
  );
}

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
  if (isInstance(item)) {
    // If an instance already exists, return it
    return item as InstanceTypeFromConstructor<C[K]>;
  }

  // Check if the item is a class constructor
  if (isClassConstructor(item)) {
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
