let counter = 0;

module.exports = {
  getCounter() {
    return counter;
  },
  setCounter() {
    counter += 1;
  },
};
