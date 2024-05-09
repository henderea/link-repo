const metascraper = require('metascraper')([
  require('metascraper-description')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
  require('metascraper-image')(),
  require('metascraper-logo-favicon')()
]);

import got from 'got';

export default async (req, res) => {
  try {
    const {
      body: html,
      url
    } = await got(req.query.url);
    const metadata = await metascraper({
      html,
      url
    });
    res.statusCode = 200;
    res.json(metadata);
  } catch (e) {
    res.statusCode = 200;
    const url = req.query.url;
    res.json({ url, description: null, title: null, image: null, logo: null });
  }
};
