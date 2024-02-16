let currentTouch = null;

export function setTouch(newTouch) {
  /* saving new touch */
  if (currentTouch === null) return (currentTouch = newTouch);

  /* reseting the current touch */
  if (currentTouch === newTouch) return (currentTouch = null);
}

export function getTouch() {
  return currentTouch;
}
