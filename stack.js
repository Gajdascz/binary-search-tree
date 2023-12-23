import { node as stackNode } from "./nodes/node.js";

const stack = () => {
  let _top = null;
  let _size = 0;

  const push = (data) => {
    const node = stackNode(data);
    node.next = _top;
    _top = node;
    _size++;
  };
  const pop = () => {
    if (_size === 0) return null;
    const output = _top.data;
    _top = _top.next;
    _size--;
    return output;
  };
  return {
    get size() {
      return _size;
    },
    get top() {
      return _top ? _top.data : null;
    },
    get isEmpty() {
      return _size === 0;
    },
    push,
    pop,
  };
};

export { stack };
