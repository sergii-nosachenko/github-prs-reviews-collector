const $ = require('jquery');

class PRPage {
  constructor() {
    this.selectors = {
      reviews: '.js-comment[id^="pullrequestreview-"][data-channel]',
    };
  }

  get $reviews() {
    return $(this.selectors.reviews);
  }
}

module.exports = PRPage;
