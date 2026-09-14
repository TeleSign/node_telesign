const routes = require('./ScoreRoutes.js');
const BaseAdapter = require('../BaseAdapter.js');

class ScoreAdapter extends BaseAdapter {
  constructor(scoreClient) {
    super(scoreClient, routes);
  }

  emailIntelligence(callback, emailAddress, accountLifecycleEvent, options = {}) {
    const params = {
      email_address: emailAddress,
      account_lifecycle_event: accountLifecycleEvent
    };

    const optionalParams = {
      accountId: 'account_id',
      phoneNumber: 'phone_number',
      deviceId: 'device_id',
      externalId: 'external_id',
      originatingIp: 'originating_ip'
    };

    Object.keys(optionalParams).forEach(parameterName => {
      if (options[parameterName] !== undefined && options[parameterName] !== null) {
        params[optionalParams[parameterName]] = options[parameterName];
      }
    });

    return this.routeAdapter.execute(
      callback,
      'submitEmailAddressForEmailIntelligence',
      params
    );
  }
}

module.exports = ScoreAdapter;