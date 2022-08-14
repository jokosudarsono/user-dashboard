export const debounce = (func, delay) => {
  let interval;

  function cancel() {
    if (interval !== undefined) {
      clearTimeout(interval);
    }
  }

  function debounced() {
    let self = this;
    let args = arguments;

    clearTimeout(interval);

    interval = setTimeout(() => {
      func.apply(self, args)
    }, delay)
  }

  debounced.cancel = cancel
  return debounced
}
