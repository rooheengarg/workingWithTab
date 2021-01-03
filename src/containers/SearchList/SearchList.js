import React from "react";
import PropTypes from "prop-types";
import css from "./SearchList.module.css";

import SearchResultCard from "../../components/SearchResultCard/SearchResultCard";

const SearchList = ({ result, activeCard, setHovered }) => {
  return (
    <div className={css.list}>
      {result &&
        result.length > 0 &&
        result.map((el, i) => {
          return (
            <SearchResultCard
              index={i}
              active={activeCard === i}
              key={el.id}
              cardData={el}
              setHovered={setHovered}
            />
          );
        })}
    </div>
  );
};

SearchList.propTypes = {
  result: PropTypes.array,
  activeCard: PropTypes.number,
  setHovered: PropTypes.func,
};

export default SearchList;
