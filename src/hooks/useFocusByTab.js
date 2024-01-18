import { useState } from "react";
import { KEYBOARD_KEYS_DATA } from "../helpers/keyBoardUtils";

export const useFocusByTab = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleTabPress = (event) => {
    if (
      event.key === KEYBOARD_KEYS_DATA.TAB.key ||
      event.keyCode === KEYBOARD_KEYS_DATA.TAB.keyCode
    ) {
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return {
    isFocused,
    handleTabPress,
    handleBlur,
  };
};
