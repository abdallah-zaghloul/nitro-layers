type HttpErrorStatus = keyof typeof DEFAULT_ERROR_STATUS;
type HttpResponseStatus = keyof typeof DEFAULT_RESPONSE_STATUS;
type HttpStatus = HttpErrorStatus | HttpResponseStatus;

// Define a Container type with class constructors or instances
type Container<T extends Record<string, new (...args: any[]) => any>> = {
  [K in keyof T]: T[K] | InstanceType<T[K]>;
};

// Utility type to extract constructor parameters
type ConstructorParams<T extends new (...args: any[]) => any> = T extends new (
  ...args: infer P
) => any
  ? P
  : never;

// Utility type to get the instance type from a class constructor
type InstanceTypeFromConstructor<T extends new (...args: any[]) => any> =
  T extends new (...args: any[]) => infer I ? I : never;
