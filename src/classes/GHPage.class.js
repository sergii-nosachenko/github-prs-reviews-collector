const $ = require('jquery');

class GHPage {
  constructor() {
    this.selectors = {
      PRLink: '.Link--primary[data-hovercard-type="pull_request"]',
    };
  }

  get $PRLinks() {
    return $(this.selectors.PRLink);
  }
}

GHPage.linkToPage = () => window.location.href;

module.exports = GHPage;
