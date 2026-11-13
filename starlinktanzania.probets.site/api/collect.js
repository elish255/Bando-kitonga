const { randomUUID } = require('node:crypto');
const {
  PROVIDERS,
  getCredentials,
  isSameOrigin,
  normalizePhone,
  packageAmount,
  parseJsonBody,
  requestDalipay,
  sendJson,
} = require('../lib/dalipay');

module.exports = async function collect(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { ok: false, error: 'Njia hii inakubali POST pekee.' });
  }

  if (!isSameOrigin(req)) {
    return sendJson(res, 403, { ok: false, error: 'Ombi halikuruhusiwa.' });
  }

  const body = parseJsonBody(req);
  const amount = packageAmount(body?.package);
  const phone = normalizePhone(body?.phone);
  const provider = typeof body?.provider === 'string' ? PROVIDERS[body.provider] : null;

  if (!amount || !phone || !provider) {
    return sendJson(res, 400, { ok: false, error: 'Hakiki kifurushi, mtandao na namba ya simu.' });
  }

  try {
    getCredentials();
    const externalId = `bt_${randomUUID().replace(/-/g, '').slice(0, 27)}`;
    const collection = await requestDalipay('/collections', {
      method: 'POST',
      body: JSON.stringify({
        account_number: phone,
        amount,
        currency: 'TZS',
        provider,
        external_id: externalId,
      }),
    });

    if (!collection?.uuid || typeof collection.uuid !== 'string') {
      return sendJson(res, 502, { ok: false, error: 'Dalipay haikurudishia kumbukumbu ya malipo.' });
    }

    return sendJson(res, 200, {
      ok: true,
      uuid: collection.uuid,
      reference: collection.reference || null,
      phone,
    });
  } catch (error) {
    if (error.message === 'DALIPAY_CONFIGURATION_MISSING') {
      return sendJson(res, 503, { ok: false, error: 'Malipo hayajasanidiwa bado. Jaribu tena baadaye.' });
    }

    const status = error.status === 400 ? 400 : 502;
    return sendJson(res, status, {
      ok: false,
      error: status === 400
        ? 'Dalipay imekataa maelezo ya malipo. Hakiki namba na mtandao.'
        : 'Imeshindikana kuwasiliana na Dalipay. Jaribu tena baadaye.',
    });
  }
};
