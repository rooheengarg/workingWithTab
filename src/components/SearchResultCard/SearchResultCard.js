import React from "react";
import PropTypes from "prop-types";
import css from "./SearchResultCard.module.css";

const SearchResultCard = ({ cardData, active, setHovered, index }) => {
  const { id, name, address, items, pincode } = cardData || {};
  return (
    <div
      id={id}
      onMouseEnter={() => setHovered(index)}
      className={`${css.card} ${active ? css.active : ""} `}
    >
      <div>{` ${name} | ${address} `}</div>
      {pincode && <span className={css.margintop8}>{pincode}</span>}
      <div className="">
        {items &&
          items.length > 0 &&
          items.map((el, i) => {
            return (
              <div className={` ${css.margintop8}`} key={i}>
                {`${i} - ${el}`}
              </div>
            );
          })}
      </div>
    </div>
  );
};

SearchResultCard.propTypes = {
  cardData: PropTypes.object,
  active: PropTypes.bool,
  setHovered: PropTypes.func,
  index: PropTypes.number,
};

export default SearchResultCard;
