const $ = require('jquery');
const addButtonsToReviews = require('./functions/addButtonsToReviews');
const GHPage = require('./classes/GHPage.class');
const showReviewsAdded = require('./functions/showReviewsAdded');

$(() => {
  const pageUrl = GHPage.linkToPage();
  console.log('Current page:', pageUrl);

  switch (true) {
    case /\/mate-academy\/[^/]+\/pull\//.test(pageUrl):
      addButtonsToReviews();
      break;

    case /\/mate-academy\/[^/]+\/pulls/.test(pageUrl):
      showReviewsAdded();
      break;

    default:
      console.log('Skipping the page.');
  }
});
