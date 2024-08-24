
type HttpErrorStatusName = keyof typeof DEFAULT_ERROR_STATUS;
type HttpResponseStatusName = keyof typeof DEFAULT_RESPONSE_STATUS;
type HttpStatusObject = { statusCode: number; statusMessage: string };
type HttpStatus =
  | HttpErrorStatusName
  | HttpResponseStatusName
  | HttpStatusObject;

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
