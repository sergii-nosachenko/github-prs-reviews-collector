const $ = require('jquery');
const DataStorage = require('../classes/Storage.class');
const GHPage = require('../classes/GHPage.class');

function showReviewsAdded() {
  const page = new GHPage();
  const storage = new DataStorage();
  const PRLinks = page.$PRLinks;

  if (!PRLinks.length) {
    return;
  }

  PRLinks.each(function addButton() {
    const $PRLink = $(this);
    const reviewsAddedInfo = $PRLink.parent().find('.reviews-added');

    if (reviewsAddedInfo.length) {
      return;
    }

    const pageUrl = $PRLink.attr('href');
    const taskSlug = pageUrl
      .split('/mate-academy/')
      .slice(-1)[0]
      .split('/pull/')[0];

    const reviewsIds = storage.getReviewsIds(taskSlug, pageUrl);

    const reviewsAdded = reviewsIds.length;
    const $reviewsAdded = $(`<span class="reviews-added">Reviews added: ${reviewsAdded}</span>`);

    $PRLink.after($reviewsAdded);
  });
}

module.exports = showReviewsAdded;
