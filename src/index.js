const $ = require('jquery');
const addButtonsToReviews = require('./functions/addButtonsToReviews');

console.log('Hello from index.js!');

$(document).ready(() => {
  console.log('Document is ready!');
  addButtonsToReviews();
});
