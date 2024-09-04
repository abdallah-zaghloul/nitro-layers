type HttpErrorStatus = keyof typeof DEFAULT_ERROR_STATUS;
type HttpResponseStatus = keyof typeof DEFAULT_RESPONSE_STATUS;
type HttpStatus = HttpErrorStatus | HttpResponseStatus;

type Constructor<C extends new (...args: any[]) => any> = new (
  ...args: ConstructorParameters<C>
) => InstanceType<C>;

type Method = (...args: any[]) => any;
type MethodOf<T extends Constructor<any> | InstanceType<any> | object> = {
  [K in keyof T]: T[K] extends Method ? K : never;
}[keyof T];

type Dependencies = { [key: string]: Constructor<any> };
type Singleton<D extends Dependencies> = {
  [K in keyof D]: InstanceType<D[K]>;
};
