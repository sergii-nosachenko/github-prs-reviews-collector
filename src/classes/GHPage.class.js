const $ = require('jquery');

class GHPage {
  constructor() {
    this.selectors = {
      PRLink: '.Link--primary[data-hovercard-type="pull_request"]',
      header: '.AppHeader-context-full',
      headerList: '[role="list"]',
    };
  }

  get $PRLinks() {
    return $(this.selectors.PRLink);
  }

  get $header() {
    return $(this.selectors.header);
  }

  get $headerList() {
    return $(this.selectors.headerList);
  }
}

GHPage.linkToPage = () => window.location.href;

module.exports = GHPage;
