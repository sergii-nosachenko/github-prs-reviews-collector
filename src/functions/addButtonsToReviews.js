const $ = require('jquery');
const PRPage = require('../classes/PRPage.class');
const ReviewItem = require('../classes/ReviewItem.class');
const ActionButton = require('../classes/ActionButton.class');
const DataStorage = require('../classes/Storage.class');
const GHPage = require('../classes/GHPage.class');

function addButtonsToReviews() {
  const page = new PRPage();
  const storage = new DataStorage();

  const reviews = page.$reviews;

  if (!reviews.length) {
    return;
  }

  reviews.each(function addButton() {
    const $review = $(this);
    const reviewItem = new ReviewItem($review);

    if (reviewItem.$addOrRemoveReviewBtn.length) {
      return;
    }

    const reviewId = Number($review.attr('id').replace('pullrequestreview-', ''));
    const pageUrl = GHPage.linkToPage();
    const taskSlug = pageUrl
      .split('/mate-academy/')
      .slice(-1)[0]
      .split('/pull/')[0];

    const reviewsIds = storage.getReviewsIds(taskSlug, pageUrl);

    const isReviewAdded = reviewsIds.includes(reviewId);
    const action = isReviewAdded ? 'remove' : 'add';
    const actionButton = new ActionButton(
      $review,
      reviewId,
      action,
    );

    reviewItem.$itemBody
      .children()
      .eq(1)
      .prepend(actionButton.buttonElement);

    actionButton.$button.on('click', (e) => {
      e.preventDefault();

      const currentAction = actionButton.action;

      storage.updateReviewsIds(taskSlug, pageUrl, reviewId, currentAction);

      actionButton.action = currentAction === 'add'
        ? 'remove'
        : 'add';
      actionButton.updateLabel();
    });
  });
}

module.exports = addButtonsToReviews;
