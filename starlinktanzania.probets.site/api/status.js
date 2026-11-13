const {
  getCredentials,
  requestDalipay,
  sendJson,
} = require('../lib/dalipay');

module.exports = async function status(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return sendJson(res, 405, { error: 'Njia hii inakubali GET pekee.' });
  }

  const uuid = typeof req.query?.uuid === 'string' ? req.query.uuid : '';
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)) {
    return sendJson(res, 400, { error: 'Kumbukumbu ya malipo si sahihi.' });
  }

  try {
    getCredentials();
    const collection = await requestDalipay(`/collections/${encodeURIComponent(uuid)}/status`, {
      method: 'GET',
    });
    const gatewayStatus = String(collection?.status || '').toLowerCase();
    const status = gatewayStatus === 'success'
      ? 'completed'
      : gatewayStatus === 'failed'
        ? 'failed'
        : 'processing';

    return sendJson(res, 200, { status });
  } catch (error) {
    if (error.message === 'DALIPAY_CONFIGURATION_MISSING') {
      return sendJson(res, 503, { error: 'Malipo hayajasanidiwa bado.' });
    }

    return sendJson(res, 502, { error: 'Imeshindikana kupata hali ya malipo.' });
  }
};
