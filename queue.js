import { node as queueNode } from "./nodes/node.js";

const queue = () => {
  let _head = null;
  let _tail = null;
  let _size = 0;

  const setFirstNode = (node) => {
    _head = node;
    _tail = node;
  };

  const enqueue = (data) => {
    const node = queueNode(data);
    if (_size === 0) setFirstNode(node);
    else {
      _tail.next = node;
      _tail = node;
    }
    _size++;
  };
  const dequeue = () => {
    if (_size === 0) return null;
    const output = _head.data;
    _head = _head.next;
    if (_size === 1) {
      _tail = null;
    }
    _size--;
    return output;
  };
  return {
    get size() {
      return _size;
    },
    get peek() {
      return _head ? _head.data : null;
    },
    get isEmpty() {
      return _size === 0;
    },
    enqueue,
    dequeue,
  };
};

export { queue };
