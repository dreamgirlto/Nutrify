/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import logo from "./LOGO-small.svg";
import SearchSummary from "./searchSummary";
import MoreSearchOptions from "./MoreSearchOptions";
import SearchDropdown from "./searchDropdown";

const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const [searchOptions, setSearchOptions] = useState({
    balanced: false,
    lowCarb: false,
    lowFat: false,
    lowSodium: false,
    highFiber: false,
    highProtein: false,
  });
  const [query, setQuery] = useState();
  const [isExpanded, toggleExpand] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    //the line below calls the function and passes it the values from the input and the dropdown
    props.onClick(input, searchOptions);
    setQuery(input, searchOptions);
    // props.setSearched()
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      props.onClick(input, searchOptions);
      setQuery(input, searchOptions);
    }
  }



  const updateOptions = (e) => {
    e.target.name === "low carb"
      ? (searchOptions.lowCarb = !searchOptions.lowCarb)
      : (searchOptions.lowCarb = searchOptions.lowCarb);

    e.target.name === "low fat"
      ? (searchOptions.lowFat = !searchOptions.lowFat)
      : (searchOptions.lowFat = searchOptions.lowFat);

    e.target.name === "balanced"
      ? (searchOptions.balanced = !searchOptions.balanced)
      : (searchOptions.balanced = searchOptions.balanced);

    e.target.name === "high protein"
      ? (searchOptions.highProtein = !searchOptions.highProtein)
      : (searchOptions.highProtein = searchOptions.highProtein);

    e.target.name === "high fiber"
      ? (searchOptions.highFiber = !searchOptions.highFiber)
      : (searchOptions.highFiber = searchOptions.highFiber);

    e.target.name === "low sodium"
      ? (searchOptions.lowSodium = !searchOptions.lowSodium)
      : (searchOptions.lowSodium = searchOptions.lowSodium);

    if (e.target.name === 'cal-from' && !isNaN(e.target.value)) {
      searchOptions.calFrom = e.target.value
    }

    if (e.target.name === 'cal-to' && !isNaN(e.target.value)) {
      searchOptions.calTo = e.target.value
    }

    console.log(searchOptions);
  };

  const toggle = () => {
    toggleExpand(!isExpanded);
    console.log("toggle");

    let dropdown = document.getElementById("search-options-expand");

    dropdown.classList.remove("search-dropdown-closed");
    dropdown.classList.add("search-dropdown-open");

    console.log("classList in toggle, after change: ", dropdown.classList);

    let childArray = Array.from(dropdown.children);

    childArray.forEach((elem) => {
      elem.classList.remove("search-option-heading-closed");
      elem.classList.add("search-option-heading-open");
    });
  };

  const toggleOff = () => {
    toggleExpand(!isExpanded);
    console.log("toggleOff");
    let dropdown = document.getElementById("search-options-expand");

    dropdown.classList.remove("search-dropdown-open");
    dropdown.classList.add("search-dropdown-closed");

    let childArray = Array.from(dropdown.children);

    childArray.forEach((elem) => {
      elem.classList.remove("search-option-heading-open");
      elem.classList.add("search-option-heading-closed");
      console.log("elements classList in toggleOff", elem.classList);
    });
  };

  return (
    <form className="search-form">
      <div className="search-flexbox-span flex-align-bottom">
        <img src={logo} className="logo"></img>
        <span className="subline">powered by edamam</span>
      </div>
      <input
        type="text"
        id="search-bar"
        value={input}
        onChange={handleChange}
        onKeyPress={(e) => handleEnter(e)}
        className="search-bar"
        placeholder="search by ingredient or recipe name"
      ></input>
      <div className="search-flexbox-span">
        <a
          className="waves-effect waves-light btn search-button"
          onClick={handleClick}
        >
          search
        </a>

        <MoreSearchOptions
          onClick={isExpanded ? toggleOff : toggle}
        ></MoreSearchOptions>
      </div>
      <SearchDropdown updateOptions={updateOptions}></SearchDropdown>
      <SearchSummary query={query}></SearchSummary>
    </form >
  );
};

export default SearchBar;
