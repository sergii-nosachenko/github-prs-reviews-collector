const { STORAGE_EVENTS } = require('../constants');

/**
 * {
 *   [taskSlug]: {
 *     [pullRequestId]: [reviewId1, reviewId2, ...],
 *     ...
 *   },
 *   ...
 * }
 */
class DataStorage {
  constructor() {
    this.storage = window.localStorage;
    this.listeners = {
      [STORAGE_EVENTS.ADD]: [],
      [STORAGE_EVENTS.REMOVE]: [],
    };
  }

  getRecord(key) {
    return this.storage.getItem(key);
  }

  setRecord(key, value) {
    this.storage.setItem(key, value);

    this.dispatchEvent(STORAGE_EVENTS.ADD, { taskSlug: key, reviews: value });
  }

  removeRecord(key) {
    this.storage.removeItem(key);

    this.dispatchEvent(STORAGE_EVENTS.REMOVE, { taskSlug: key });
  }

  clearStorage() {
    this.storage.clear();
  }

  get length() {
    return this.storage.length;
  }

  getData(taskSlug) {
    const storageRecord = this.getRecord(taskSlug);

    return storageRecord
      ? JSON.parse(storageRecord)
      : {};
  }

  getReviewsIds(taskSlug, pullRequestId) {
    const storageData = this.getData(taskSlug);

    return storageData[pullRequestId] ?? [];
  }

  updateReviewsIds(taskSlug, pullRequestId, reviewId, action) {
    const storageData = this.getData(taskSlug);

    const reviewsIds = storageData[pullRequestId] ?? [];
    const updatedReviewsIds = action === 'add'
      ? [...reviewsIds, reviewId]
      : reviewsIds.filter((id) => id !== reviewId);

    if (!updatedReviewsIds.length) {
      delete storageData[pullRequestId];
    } else {
      storageData[pullRequestId] = updatedReviewsIds;
    }

    if (!Object.keys(storageData).length) {
      this.removeRecord(taskSlug);
    } else {
      this.setRecord(taskSlug, JSON.stringify(storageData));
    }
  }

  addListener(events, callback) {
    const eventsArray = Array.isArray(events) ? events : [events];

    eventsArray.forEach((event) => {
      switch (event) {
        case STORAGE_EVENTS.ADD:
        case STORAGE_EVENTS.REMOVE:
          this.listeners[event].push(callback);
          break;

        default:
          // eslint-disable-next-line no-console
          console.error('Unknown event', event);
      }
    });
  }

  dispatchEvent(event, data) {
    console.log('dispatchEvent', event, data);

    switch (event) {
      case STORAGE_EVENTS.ADD:
      case STORAGE_EVENTS.REMOVE:
        this.listeners[event].forEach((callback) => callback(data));
        break;

      default:
        // eslint-disable-next-line no-console
        console.error('Unknown event', event);
    }
  }
}

module.exports = DataStorage;
