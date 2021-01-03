import React, { useState } from "react";
import InputState from "../../components/InputState/InputState";
import SearchList from "../SearchList/SearchList";
import NoResultFound from "../../components/NoResultFound/NoResultFound";

import { data } from "../../constant";

import css from "./SearchPage.module.css";

const SearchPage = () => {
  const [filteredData, updateData] = useState([]);
  const [inputVal, updateVal] = useState("");
  const [activeEl, updateEl] = useState(0);

  const filter = (str) => {
    let temp = [];
    function cb(el) {
      return (
        el.name.toLowerCase().includes(str) ||
        el.id.toLowerCase().includes(str) ||
        el.address.toLowerCase().includes(str) ||
        el.items.join("").toLowerCase().includes(str)
      );
    }

    for (var i = 0; i < data.length; i++) {
      if (cb(data[i])) temp.push(data[i]);
    }
    updateData(temp);
  };

  const onInputChange = (val) => {
    if (val) {
      filter(val.trim());
      updateVal(val.trim());
    } else {
      updateData([]);
      updateVal("");
    }
  };

  const onKeyPress = (e) => {
    // arrow up/down button should select next/previous list element
    if (e.keyCode === 38 && activeEl > 0) {
      updateEl(activeEl - 1);
    }
    if (e.keyCode === 40 && activeEl < filteredData.length - 1) {
      updateEl(activeEl + 1);
    }
    if (e.keyCode === 40 && activeEl === filteredData.length - 1) {
      updateEl(0);
    }

    if (filteredData[activeEl] && filteredData[activeEl].id) {
      var target = document.getElementById(filteredData[activeEl].id);
      console.log("target ==>", target);
      if (target)
        target.scrollIntoView({
          behavior: "smooth",
        });
    }
  };

  const onMouseEvent = (el) => {
    updateEl(el);
  };

  const onClearInput = () => {
    updateData([]);
    updateEl(null);
    updateVal("");
  };

  return (
    <div className={css.searchPgContainer}>
      <InputState
        placeholderText={"Search Users by ID,name, address or ordered items"}
        onInputChange={onInputChange}
        onKeyChange={onKeyPress}
        onCrossClick={onClearInput}
      />
      {filteredData && filteredData.length > 0 ? (
        <SearchList
          setHovered={onMouseEvent}
          activeCard={activeEl}
          result={filteredData}
        />
      ) : (
        inputVal && <NoResultFound />
      )}
    </div>
  );
};

export default SearchPage;
