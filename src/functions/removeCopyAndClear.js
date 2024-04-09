const $ = require('jquery');
const { COPY_TO_CLIPBOARD_BTN_CLASS, CLEAR_ALL_REVIEWS_BTN_CLASS } = require('../constants');

function removeCopyAndClear() {
  $(`.${COPY_TO_CLIPBOARD_BTN_CLASS}`).remove();
  $(`.${CLEAR_ALL_REVIEWS_BTN_CLASS}`).remove();
}

module.exports = removeCopyAndClear;
