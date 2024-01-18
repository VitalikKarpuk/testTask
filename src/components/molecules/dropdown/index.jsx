import { useState, useEffect, useRef } from "react";
import { pressEnter } from "../../../helpers/keyBoardUtils";
import { useFocusByTab } from "../../../hooks/useFocusByTab";
import { ReactComponent as Icon } from "./img/chevronDown.svg";

import style from "./index.module.css";
import classNames from "classnames";
import { useClickOutside } from "../../../hooks/useClickOutside";

const Dropdown = ({
  dropdownOptions,
  initialValue,
  onChange,
  placeholder,
  className,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOption, setDropdownOption] = useState(initialValue);
  const [dropdownOptionsList, setDropdownOptionList] = useState(dropdownOptions);

  const { handleTabPress, handleBlur: handleFocusByTabBlur } = useFocusByTab();
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  useClickOutside(handleClickOutside);

  const openDropdown = () => {
    setDropdownOptionList(dropdownOptions);
    setDropdownOpen(!dropdownOpen);
  };
  const handleBlur = () => {
    handleFocusByTabBlur();
  };

  const handleKeyDown = (event) => {
    pressEnter(event, openDropdown);
  };

  const dropdownHandler = (event, title) => {
    event.preventDefault();
    setDropdownOption(title);
    onChange(title);

    setDropdownOpen(false);
  };

  useEffect(() => {
    setDropdownOption(initialValue);
  }, [initialValue]);
  return (
    <div className={classNames(style.dropdown, className)} ref={dropdownRef}>
      <div>
        <input
          value={dropdownOption}
          placeholder={placeholder}
          onClick={openDropdown}
          onKeyDown={handleKeyDown}
          onKeyUp={handleTabPress}
          onBlur={handleBlur}
          onChange={dropdownHandler}
        />
        <Icon
          onClick={openDropdown}
          className={classNames(style.icon, {
            [style.topIcon]: dropdownOpen,
          })}
        />
        {dropdownOpen && (
          <ul className={style.options}>
            {dropdownOptionsList?.map((option) => (
              <li
                className={classNames({
                  [style.selected]: option.value === dropdownOption,
                })}
                key={option.id}
                title={option.value}
                onClick={(event) => dropdownHandler(event, option.value)}
                tabIndex={0}
              >
                <p key={option.id}>{option.value}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
