const RouteAdapter = require('./RouteAdapter.js');

class BaseAdapter {
  constructor(client, routes) {
    this.client = client;
    this.routeAdapter = new RouteAdapter(client, routes);

    // Forward any method/property not defined on the subclass itself to client
    return new Proxy(this, {
      get(target, prop, receiver) {
        if (prop in target) {
          return Reflect.get(target, prop, receiver);
        }
        const value = target.client[prop];
        return typeof value === 'function' ? value.bind(target.client) : value;
      }
    });
  }
}

module.exports = BaseAdapter;
