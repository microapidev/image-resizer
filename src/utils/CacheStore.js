module.exports = function CacheStore({ stdTTL = 60000 }) {
  this.stdTTL = stdTTL;
  this.store = {};
  this.set = function (key, value) {
    this.store[key] = { value, createdAt: new Date() };
  };
  this.get = function (key) {
    const value = this.store[key];
    if (!value) return undefined;
    if (value.createdAt.getTime() + stdTTL < Date.now()) {
      delete this.store[key];
      return undefined;
    }
    return value.value;
  };
};
