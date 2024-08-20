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

export function useCheck() {
  return {
    isClassConstructor,
    isInstance,
  };
}
