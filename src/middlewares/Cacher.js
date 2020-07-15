const CacheStore = require("../utils/CacheStore");
const CS = new CacheStore({ stdTTL: 10000 });

module.exports = (stdTLL = 10000) => {
  CS.stdTLL = stdTLL;
  return (req, res, next) => {
    const key =
      req.originalUrl +
      JSON.stringify(req.body) +
      JSON.stringify(req.query) +
      JSON.stringify(req.param);
    const c = CS.get(key);
    if (c) {
      const status = CS.get(key + "_status") || 200;
      if (c.type) {
        return res.status(status).send(c.body);
      }
      return res.status(status).json(c.body);
    }
    res.setStatus = res.status;
    res.status = (status) => {
      CS.set(key + "_status", status);
      res.setStatus(status);
      return res;
    };
    res.sendResponse = res.send;
    res.send = (body) => {
      CS.set(key, { body, type: true });
      res.sendResponse(body);
      return res;
    };
    res.sendJson = res.json;
    res.json = (body) => {
      CS.set(key, { body, type: false });
      res.sendJson(body);
      return res;
    };
    next();
  };
};
