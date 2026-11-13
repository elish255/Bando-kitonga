const API_BASE_URL = 'https://app.dalipay.co.tz/api/v1';

const PACKAGE_PRICES = [3500, 6000, 8500, 10000, 14500, 20500];
const PROVIDERS = {
  vodacom: 'Mpesa',
  yas: 'Tigo',
  airtel: 'Airtel',
  halotel: 'Halopesa',
};

function getCredentials() {
  const publicKey = process.env.DALIPAY_PUBLIC_KEY?.trim();
  const secretKey = process.env.DALIPAY_SECRET_KEY?.trim();

  if (!publicKey || !secretKey) {
    throw new Error('DALIPAY_CONFIGURATION_MISSING');
  }

  return { publicKey, secretKey };
}

async function requestDalipay(path, options = {}) {
  const { publicKey, secretKey } = getCredentials();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Public-Key': publicKey,
      'X-Secret-Key': secretKey,
      ...options.headers,
    },
    signal: AbortSignal.timeout(12000),
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success !== true) {
    const error = new Error('DALIPAY_REQUEST_FAILED');
    error.status = response.status;
    throw error;
  }

  return payload.data;
}

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(body));
}

function isSameOrigin(req) {
  const origin = req.headers.origin;
  const host = req.headers.host;

  if (!origin || !host) return false;

  try {
    const parsedOrigin = new URL(origin);
    return (parsedOrigin.protocol === 'https:' || parsedOrigin.protocol === 'http:') &&
      parsedOrigin.host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}

function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return null;
}

function packageAmount(packageId) {
  const match = typeof packageId === 'string' && packageId.match(/^(?:vodacom|yas|airtel|halotel)-([1-6])$/);
  return match ? PACKAGE_PRICES[Number(match[1]) - 1] : null;
}

function normalizePhone(value) {
  if (typeof value !== 'string') return null;
  let digits = value.replace(/\D/g, '');

  if (digits.startsWith('255')) digits = digits.slice(3);
  else if (digits.startsWith('0')) digits = digits.slice(1);

  return /^[67]\d{8}$/.test(digits) ? `0${digits}` : null;
}

module.exports = {
  PROVIDERS,
  getCredentials,
  isSameOrigin,
  normalizePhone,
  packageAmount,
  parseJsonBody,
  requestDalipay,
  sendJson,
};
