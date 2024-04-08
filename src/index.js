const $ = require('jquery');
const GHPage = require('./classes/GHPage.class');
const addButtonsToReviews = require('./functions/addButtonsToReviews');
const showReviewsAdded = require('./functions/showReviewsAdded');
const addCopyAndClear = require('./functions/addCopyAndClear');
const removeCopyAndClear = require('./functions/removeCopyAndClear');

$(() => {
  setInterval(() => {
    const pageUrl = GHPage.linkToPage();

    switch (true) {
      case /\/mate-academy\/[^/]+\/pull\//.test(pageUrl):
        addButtonsToReviews();
        addCopyAndClear();
        break;

      case /\/mate-academy\/[^/]+\/pulls/.test(pageUrl):
        showReviewsAdded();
        break;

      default:
        removeCopyAndClear();
        // eslint-disable-next-line no-console
        console.log('Skipping the page.');
    }
  }, 1000);
});
