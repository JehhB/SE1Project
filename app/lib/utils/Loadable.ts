export type Loadable<T> =
  | {
      isLoading: true;
      error: null;
      data: null;
    }
  | {
      isLoading: false;
      error: Error;
      data: null;
    }
  | {
      isLoading: false;
      error: null;
      data: T;
    };

export function loaded<T>(data: T): Loadable<T> {
  return {
    isLoading: false,
    error: null,
    data,
  };
}

export function loading<T>(): Loadable<T> {
  return {
    isLoading: true,
    error: null,
    data: null,
  };
}

export function failed<T>(error: Error): Loadable<T> {
  return {
    isLoading: false,
    data: null,
    error,
  };
}
