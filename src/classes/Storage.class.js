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
  }

  getRecord(key) {
    return this.storage.getItem(key);
  }

  setRecord(key, value) {
    this.storage.setItem(key, value);
  }

  removeRecord(key) {
    this.storage.removeItem(key);
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
}

module.exports = DataStorage;
