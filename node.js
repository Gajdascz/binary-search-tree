function node({ name = null, data = {}, left = null, right = null, count = 0 } = {}) {
  let _data = data;
  let _left = left;
  let _right = right;
  let _name = name;
  let _count = count;

  const hasDataKey = (key) => Object.keys(_data).includes(key);

  const addData = (key, value) => {
    try {
      if (hasDataKey(key)) throw new Error(`${key} already exists.`);
      else _data[key] = value;
    } catch (error) {
      console.error(error);
    }
  };

  const removeData = (key) => {
    try {
      if (!hasDataKey(key)) throw new Error(`${key} does not exist.`);
      else delete _data[key];
    } catch (error) {
      console.error(error);
    }
  };

  const getData = (key) => {
    try {
      if (!hasDataKey(key)) throw new Error(`${key} does not exist.`);
      else return _data[key];
    } catch (error) {
      console.error(error);
    }
  };

  return {
    get left() {
      return _left;
    },
    set left(leftNode) {
      _left = leftNode;
    },
    get right() {
      return _right;
    },
    set right(rightNode) {
      _right = rightNode;
    },
    get allData() {
      return _data;
    },
    get name() {
      return _name;
    },
    set name(newName) {
      _name = newName;
    },
    get count() {
      return _count;
    },
    set count(newCount) {
      _count = newCount;
    },
    addData,
    removeData,
    getData,
  };
}

export { node };
