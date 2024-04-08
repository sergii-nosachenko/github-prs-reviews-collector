const $ = require('jquery');
const addButtonsToReviews = require('./functions/addButtonsToReviews');

console.log('Hello from index.js!');

$(() => {
  console.log('Document is ready!');
  addButtonsToReviews();
});
