const $ = require('jquery');

class HeaderItem {
  constructor(
    $parent,
    label,
    className,
  ) {
    this.$parent = $parent;
    this.label = label;
    this.className = className;
  }

  get itemHTML() {
    return `
      <a 
        href="/"
        class="
          AppHeader-context-item
          ${this.className}
        "
      >
        <span class="AppHeader-context-item-label">
          ${this.label}
        </span>
      </a>
    `;
  }

  get itemElement() {
    return $(this.itemHTML);
  }

  get $item() {
    return $(this.$parent).find(`.${this.className}`);
  }

  updateLabel(newLabel) {
    this.$item.find('.AppHeader-context-item-label').text(newLabel);
  }
}

module.exports = HeaderItem;
