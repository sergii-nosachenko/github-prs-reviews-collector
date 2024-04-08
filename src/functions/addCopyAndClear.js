const $ = require('jquery');
const DataStorage = require('../classes/Storage.class');
const GHPage = require('../classes/GHPage.class');
const { getTaskSlug } = require('../helpers');
const HeaderItem = require('../classes/HeaderItem.class');
const { COPY_TO_CLIPBOARD_BTN_CLASS, CLEAR_ALL_REVIEWS_BTN_CLASS } = require('../constants');

function addCopyAndClear() {
  const page = new GHPage();
  const storage = new DataStorage();

  const pageUrl = GHPage.linkToPage();
  const taskSlug = getTaskSlug(pageUrl);

  const records = storage.getData(taskSlug);

  if (!Object.keys(records).length) {
    return;
  }

  const PRs = Object.keys(records);
  const reviewsCount = PRs.reduce((acc, pr) => acc + records[pr].length, 0);

  if (!$(`.${COPY_TO_CLIPBOARD_BTN_CLASS}`).length) {
    const copyToClipboardBtn = new HeaderItem(
      page.$headerList,
      `Copy to clipboard (${reviewsCount})`,
      COPY_TO_CLIPBOARD_BTN_CLASS,
    );

    page.$headerList.append(copyToClipboardBtn.itemElement);

    copyToClipboardBtn.$item.on('click', (e) => {
      e.preventDefault();

      const textToCopy = JSON.stringify({
        [taskSlug]: records,
      });

      navigator.clipboard.writeText(textToCopy);
    });

    window.addEventListener('storage', (e) => {
      if (e.key === 'data') {
        const data = JSON.parse(e.newValue);

        if (data && data[taskSlug]) {
          const newRecords = data[taskSlug];
          const newPRs = Object.keys(newRecords);
          const newReviewsCount = newPRs.reduce((acc, pr) => acc + newRecords[pr].length, 0);

          copyToClipboardBtn.updateLabel(`Copy to clipboard (${newReviewsCount})`);
        }
      }
    });
  }

  if (!$(`.${CLEAR_ALL_REVIEWS_BTN_CLASS}`).length) {
    const clearAllBtn = new HeaderItem(
      page.$headerList,
      'Clear task records',
      CLEAR_ALL_REVIEWS_BTN_CLASS,
    );

    page.$headerList.append(clearAllBtn.itemElement);

    clearAllBtn.$item.on('click', (e) => {
      e.preventDefault();

      storage.removeRecord(taskSlug);

      window.location.reload();
    });
  }
}

module.exports = addCopyAndClear;
