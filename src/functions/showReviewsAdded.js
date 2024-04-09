const $ = require('jquery');
const DataStorage = require('../classes/Storage.class');
const GHPage = require('../classes/GHPage.class');
const { getPRId, getTaskSlug } = require('../helpers');

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

    const pageUrl = $PRLink.attr('href');
    const taskSlug = getTaskSlug(pageUrl);
    const pullRequestId = getPRId(pageUrl);

    const reviewsIds = storage.getReviewsIds(taskSlug, pullRequestId);

    const reviewsAdded = reviewsIds.length;
    const prevReviewsAdded = reviewsAddedInfo.length
      ? Number(reviewsAddedInfo.text().split(': ')[1])
      : 0;

    if (!reviewsAdded) {
      reviewsAddedInfo?.remove();

      return;
    }

    if (prevReviewsAdded === reviewsAdded) {
      return;
    }

    reviewsAddedInfo.remove();

    const $reviewsAdded = $(`
      <span class="reviews-added ml-1 mr-1"> --> Reviews added: ${reviewsAdded}</span>
    `);

    $PRLink.after($reviewsAdded);
  });
}

module.exports = showReviewsAdded;