import { useEffect } from "react";

export const useClickOutside = (onClickOutside) => {
  useEffect(() => {
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [onClickOutside]);
};
