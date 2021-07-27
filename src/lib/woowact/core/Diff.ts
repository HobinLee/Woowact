const reconciliation = (
  $old: HTMLElement | null,
  $new: HTMLElement,
): HTMLElement => {
  if ($old === null) return $new;

  if ($old.tagName !== $new.tagName) {
    return $new;
  } else {
    $old.replaceWith($new);

    $old.remove();
    return $new;
  }
};

export default { reconciliation };
