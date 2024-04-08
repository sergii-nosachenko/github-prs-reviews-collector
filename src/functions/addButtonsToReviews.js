const $ = require('jquery');
const PRPage = require('../classes/PRPage.class');
const ReviewItem = require('../classes/ReviewItem.class');
const { ADD_REMOVE_REVIEW_BTN_CLASS } = require('../constants');

function addButtonsToReviews() {
  const page = new PRPage();

  const reviews = page.$reviews;

  console.log('reviews', reviews);

  if (!reviews.length) {
    return;
  }

  reviews.each(function addButton() {
    const $review = $(this);
    const reviewItem = new ReviewItem($review);

    console.log('reviewItem', reviewItem);

    if (reviewItem.$addOrRemoveReviewBtn.length) {
      return;
    }

    const reviewId = Number($review.attr('id').replace('pullrequestreview-', ''));
    const pageUrl = PRPage.linkToPage();
    const taskSlug = pageUrl
      .split('/mate-academy/')
      .slice(-1)[0]
      .split('/pull/')[0];
    const storageRecord = localStorage.getItem(taskSlug);
    const storageData = storageRecord
      ? JSON.parse(storageRecord)
      : [];

    const addedPR = storageData.find((pr) => pr.pullRequestUrl === pageUrl) ?? {
      pullRequestUrl: pageUrl,
      reviewsIds: [],
    };

    let isReviewAdded = false;

    if (addedPR) {
      isReviewAdded = addedPR.reviewsIds.includes(reviewId);
    }

    const action = isReviewAdded ? 'remove' : 'add';
    const label = isReviewAdded ? 'Remove review from the list' : 'Add review to the list';

    const button = $(`
      <a 
        href="#"
        data-review-id="${reviewId}"
        data-action="${action}"
        data-view-component="true" 
        class="
          ${ADD_REMOVE_REVIEW_BTN_CLASS}
          Button--invisible 
          Button--small 
          Button 
          Button--invisible-noVisuals 
          ml-0 
          ml-md-2
        ">
          <span class="Button-content">
            <span class="Button-label">${label}</span>
          </span>
      </a>
    `);

    console.log('children', reviewItem.$itemBody.children());
    console.log('children 1', reviewItem.$itemBody.children().eq(1));

    reviewItem.$itemBody
      .children()
      .eq(1)
      .prepend(button);
  });
}

module.exports = addButtonsToReviews;
