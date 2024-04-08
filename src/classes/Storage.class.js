/**
 * {
 *   [taskSlug]: {
 *     [pullRequestUrl]: [reviewId1, reviewId2, ...],
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

  getReviewsIds(taskSlug, pageUrl) {
    const storageData = this.getData(taskSlug);

    return storageData[pageUrl] ?? [];
  }

  updateReviewsIds(taskSlug, pageUrl, reviewId, action) {
    const storageData = this.getData(taskSlug);

    const reviewsIds = storageData[pageUrl] ?? [];
    const updatedReviewsIds = action === 'add'
      ? [...reviewsIds, reviewId]
      : reviewsIds.filter((id) => id !== reviewId);

    storageData[pageUrl] = updatedReviewsIds;

    this.setRecord(taskSlug, JSON.stringify(storageData));
  }
}

module.exports = DataStorage;
