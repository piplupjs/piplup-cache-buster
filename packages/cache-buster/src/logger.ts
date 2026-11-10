export function createLogger(verbose: boolean) {
  return function logger(variant: 'error' | 'log', ...args: unknown[]) {
    if (verbose) {
      console[variant](...args);
    }
  };
}
