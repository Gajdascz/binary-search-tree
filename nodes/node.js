const node = (data, next = null) => {
  let _data = data;
  let _next = next;
  return {
    get data() {
      return _data;
    },
    set data(newData) {
      _data = newData;
    },
    get next() {
      return _next;
    },
    set next(newNext) {
      _next = newNext;
    },
  };
};

export { node };
