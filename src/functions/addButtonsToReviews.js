const $ = require('jquery');
const PRPage = require('../classes/PRPage.class');
const ReviewItem = require('../classes/ReviewItem.class');
const ActionButton = require('../classes/ActionButton.class');

function addButtonsToReviews() {
  const page = new PRPage();

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
    const pageUrl = PRPage.linkToPage();
    const taskSlug = pageUrl
      .split('/mate-academy/')
      .slice(-1)[0]
      .split('/pull/')[0];

    /**
     * {
     *   [taskSlug]: {
     *     [pullRequestUrl]: [reviewId1, reviewId2, ...],
     *     ...
     *   },
     *   ...
     * }
     */
    const storageRecord = localStorage.getItem(taskSlug);
    const storageData = storageRecord
      ? JSON.parse(storageRecord)
      : {};

    console.log('storageData init', storageData);

    const reviewsIds = storageData[pageUrl] ?? [];

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

    actionButton.$button.on('click', () => {
      const currentAction = actionButton.action;

      if (currentAction === 'add') {
        storageData[pageUrl] = [...reviewsIds, reviewId];
      } else {
        storageData[pageUrl] = reviewsIds.filter((id) => id !== reviewId);
      }

      console.log('storageData upd', storageData);

      localStorage
        .setItem(taskSlug, JSON.stringify(storageData));

      actionButton.action = currentAction === 'add' ? 'remove' : 'add';
      actionButton.updateLabel();
    });
  });
}

module.exports = addButtonsToReviews;
