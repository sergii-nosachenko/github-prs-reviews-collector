const getTaskSlug = (pageUrl) => pageUrl
  .split('/mate-academy/')
  .slice(-1)[0]
  .split('/pull')[0];

const getPRId = (pageUrl) => pageUrl
  .split('/pull/')
  .slice(-1)[0]
  .replace(/\D+/g, '');

module.exports = {
  getTaskSlug,
  getPRId,
};
