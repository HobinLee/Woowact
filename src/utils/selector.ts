export const $ = (
  selectors: string,
  $el: HTMLElement | Document = document,
): HTMLElement | null => {
  return $el.querySelector(selectors);
};

export const $$ = (
  selectors: string,
  $el: HTMLElement | Document = document,
): NodeListOf<HTMLElement> => {
  return $el.querySelectorAll(selectors);
};
