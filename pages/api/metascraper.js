const metascraper = require('metascraper')([
  require('metascraper-description')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
  require('metascraper-image')(),
  require('metascraper-logo-favicon')()
]);

const got = require('got');

export default async (req, res) => {
  const { body: html, url } = await got(req.query.url);
  const metadata = await metascraper({
    html,
    url
  });
  res.statusCode = 200;
  res.json(metadata);
}
