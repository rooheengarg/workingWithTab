import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import SearchIcon from "../../assets/search.png";
import CancelIcon from "../../assets/cancel.png";

import css from "./InputState.module.css";

const InputState = ({
  onInputChange,
  placeholderText,
  onCrossClick,
  onKeyChange,
}) => {
  const [showCross, toggleCross] = useState(false);

  let inputEl = useRef(null);

  const clearInput = () => {
    console.log("clearing input");
    inputEl.current.value = "";
    toggleCross(false);
  };

  const onValueChange = (event) => {
    if (event.target.value) {
      toggleCross(true);
    } else {
      toggleCross(false);
    }
    onInputChange(event.target.value);
  };

  return (
    <div className={css.posRelative}>
      <img className={css.search} src={SearchIcon} alt="search" />
      <input
        ref={inputEl}
        className={css.inputContainer}
        type="text"
        placeholder={placeholderText}
        onChange={onValueChange}
        onKeyDown={(e) => {
          onKeyChange(e);
        }}
      />
      {showCross && (
        <img
          className={css.cross}
          onClick={() => {
            clearInput();
            if (typeof onCrossClick === "function") onCrossClick();
          }}
          src={CancelIcon}
          alt="cross-icon"
        />
      )}
    </div>
  );
};

InputState.propTypes = {
  onInputChange: PropTypes.func,
  placeholderText: PropTypes.string,
  onCrossClick: PropTypes.func,
  onKeyChange: PropTypes.func,
};

export default InputState;
