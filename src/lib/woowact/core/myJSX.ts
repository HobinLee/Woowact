import Component from './Component';

const replaceComponent = (
  $parent: HTMLElement,
  $current: HTMLElement,
  components: {
    [key: string]: Component;
  },
) => {
  const nodeName = $current.nodeName;

  if (components[nodeName]) {
    const $new = components[nodeName].$element;

    if ($new) {
      $parent.replaceChild($new, $current);
    }
  }
};

const searchElement = (
  $target: HTMLElement,
  components: {
    [key: string]: Component;
  },
) => {
  const $children = Array.from($target.children);

  if ($children.length === 0 && $target.parentElement) {
    return replaceComponent($target.parentElement, $target, components);
  }

  $children.forEach($el => {
    searchElement($el as HTMLElement, components);
  });
};

export const parseJSX = (
  html: string,
  components: {
    [key: string]: Component;
  },
): HTMLElement => {
  const $element = document.createElement('div');
  $element.innerHTML = html;

  searchElement($element, components);

  return ($element.firstElementChild ?? $element) as HTMLElement;
};
