const dispatcher = {};

export function useMediator<Event extends keyof typeof dispatcher>(
  event: Event,
  ...params: Parameters<(typeof dispatcher)[Event]>
): ReturnType<(typeof dispatcher)[Event]> {
  // @ts-ignore
  return dispatcher[event](...params);
}
