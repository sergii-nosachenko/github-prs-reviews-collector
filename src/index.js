const $ = require('jquery');
const addButtonsToReviews = require('./functions/addButtonsToReviews');
const GHPage = require('./classes/GHPage.class');

$(() => {
  const pageUrl = GHPage.linkToPage();
  console.log('Current page:', pageUrl);

  switch (true) {
    case /\/pull\//.test(pageUrl):
      addButtonsToReviews();
      break;
    default:
      console.log('Skipping the page.');
  }
});
