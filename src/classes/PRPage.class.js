const $ = require('jquery');

class PRPage {
  constructor() {
    this.selectors = {
      reviews: '.js-comment[id^="pullrequestreview-"]',
    };
  }

  get $reviews() {
    return $(this.selectors.reviews);
  }
}

PRPage.linkToPage = () => window.location.href;

module.exports = PRPage;
