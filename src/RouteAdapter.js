class RouteAdapter {
  constructor(client, routes) {
    this.client = client;
    this.routes = routes;
  }

  execute(callback, operationName, params) {
    const route = this.routes[operationName];

    if (!route) {
      throw new Error(`Unknown operation: ${operationName}`);
    }

    this.client.setContentType(route.contentType);

    return this.client.execute(
      callback,
      route.method,
      route.path,
      params,
      route.auth
    );
  }
}

module.exports = RouteAdapter;