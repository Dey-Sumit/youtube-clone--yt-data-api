import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCategoriesVideos,
  fetchHomeVideos,
} from "../../redux/actions/videos.action";
import { SET_ACTIVE_CATEGORY } from "../../redux/types";
import "./categoriesBar.scss";

const keywords = [
  "All",
  "React js",
  "Angular js",
  "React Native",
  "use of API",
  "Redux",
  "Music",
  "Algorithm Art ",
  "Guitar",
  "Bengali Songs",
  "Coding",
  "Cricket",
  "Football",
  "Real Madrid",
  "Gatsby",
  "Poor Coder",
  "Shwetabh",
];

const CategoriesBar = () => {
  const [active, setActive] = useState("All");
  const dispatch = useDispatch();

  const handleClick = (value) => {
    dispatch({
      type: SET_ACTIVE_CATEGORY,
      payload: value,
    });
    setActive(value);
    if (value === "All") dispatch(fetchHomeVideos());
    else dispatch(fetchCategoriesVideos(value));
  };
  return (
    <div className="categories">
      <section className="categories__section">
        {keywords.map((value, i) => (
          <button
            key={i}
            className={value === active ? "category active" : "category"}
            onClick={() => handleClick(value)}
          >
            {value}
          </button>
        ))}
      </section>
    </div>
  );
};

export default CategoriesBar;
