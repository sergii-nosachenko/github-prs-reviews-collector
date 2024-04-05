const $ = require('jquery');
const {
  ADD_REMOVE_REVIEW_BTN_CLASS,
} = require('../constants');

class ReviewItem {
  constructor($parent = $('body')) {
    this.selectors = {
      item: '.TimelineItem',
      itemBody: '.TimelineItem-body',
      addOrRemoveReviewBtn: `.${ADD_REMOVE_REVIEW_BTN_CLASS}`,
    };
    this.$parent = $parent;
  }

  set $parent($el) {
    this._$parent = $el;
  }

  get $parent() {
    return this._$parent;
  }

  get $item() {
    return this.$parent.find(this.selectors.item).first();
  }

  get $itemBody() {
    return this.$item.find(this.selectors.itemBody).first();
  }

  get $addOrRemoveReviewBtn() {
    return this.$item.find(this.selectors.addOrRemoveReviewBtn).first();
  }
}

module.exports = ReviewItem;
