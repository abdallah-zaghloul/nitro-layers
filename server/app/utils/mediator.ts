function bind<
  T extends Constructor<any> | InstanceType<any>,
  M extends MethodOf<T>
>(target: T, method: M) {
  //@ts-ignore
  return target[method].bind(target) as T[M];
}

const mediator = {
  // action: bind(target, method),
};

export function useMediator<Action extends keyof typeof mediator>(
  action: Action,
  ...params: Parameters<(typeof mediator)[Action]>
): ReturnType<(typeof mediator)[Action]> {
  // @ts-ignore
  return mediator[action](...params);
}
