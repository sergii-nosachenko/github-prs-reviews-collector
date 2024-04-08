const $ = require('jquery');
const GHPage = require('./classes/GHPage.class');
const addButtonsToReviews = require('./functions/addButtonsToReviews');
const showReviewsAdded = require('./functions/showReviewsAdded');
const addCopyAndClear = require('./functions/addCopyAndClear');

$(() => {
  setInterval(() => {
    const pageUrl = GHPage.linkToPage();
    console.log('Current page:', pageUrl);

    switch (true) {
      case /\/mate-academy\/[^/]+\/pull\//.test(pageUrl):
        addButtonsToReviews();
        addCopyAndClear();
        break;

      case /\/mate-academy\/[^/]+\/pulls/.test(pageUrl):
        showReviewsAdded();
        break;

      default:
        console.log('Skipping the page.');
    }
  }, 1000);
});
