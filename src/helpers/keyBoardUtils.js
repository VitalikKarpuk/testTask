export function pressEnter(event, fn) {
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    fn(event);
  }
}

export const KEYBOARD_KEYS_DATA = {
  TAB: {
    key: "Tab",
    keyCode: 9,
  },
};
