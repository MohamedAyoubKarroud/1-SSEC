export default async function handler(req, res) {
  const path = req.query.path || '';
  const target = `https://app-1ec7e603-b566-443b-9e76-314538965db4.cleverapps.io/api/${path}`;

  const headers = { 'Content-Type': 'application/json' };
  if (req.headers.authorization) {
    headers['Authorization'] = req.headers.authorization;
  }

  try {
    const response = await fetch(target, {
      method: req.method,
      headers,
      body: req.method !== 'GET' && req.method !== 'HEAD'
        ? JSON.stringify(req.body)
        : undefined,
    });

    const data = await response.json().catch(() => ({}));
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'proxy_error', message: err.message });
  }
}
