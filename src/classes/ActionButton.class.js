const $ = require('jquery');
const {
  ADD_REMOVE_REVIEW_BTN_CLASS,
} = require('../constants');

class ActionButton {
  constructor(
    $review,
    reviewId,
    action,
  ) {
    this.$review = $review;
    this.reviewId = reviewId;
    this.action = action;
  }

  set action(action) {
    this._action = action;
  }

  get action() {
    return this._action;
  }

  get label() {
    return this.action === 'add'
      ? 'Add review to the list'
      : 'Remove review from the list';
  }

  get buttonHTML() {
    return `
      <a 
        href="/"
        data-review-id="${this.reviewId}"
        data-action="${this.action}"
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
            <span class="Button-label">${this.label}</span>
          </span>
      </a>
    `;
  }

  get buttonElement() {
    return $(this.buttonHTML);
  }

  get $button() {
    return $(this.$review).find(`.${ADD_REMOVE_REVIEW_BTN_CLASS}`);
  }

  updateLabel() {
    this.$button.find('.Button-label').text(this.label);
  }
}

module.exports = ActionButton;
