import React, { useEffect, useState } from "react";
import { CSSTransition } from 'react-transition-group'


const RecipeCard = (props) => {


  useEffect(() => console.log(props))
  let [saved, setSaved] = useState(false)

  let handleClick = (e) => {

    if (!e.target.expanded) {
      //Checks if the div is collpased and opens it
      console.log("RUNNINNGGG")
      e.target.expanded = true;
      e.target.innerText = "Hide";
      Array.from(e.target.parentElement.children[1].children).forEach(
        (li) => {
          li.style.display = "block";
        }
      );
      e.target.parentElement.children[1].classList.remove(
        "card-content-closed"
      );
      e.target.parentElement.children[1].classList.add("card-content-open");
      e.target.parentElement.classList.remove("card-closed");
      e.target.parentElement.classList.add("card-open");
    } else if (e.target.expanded) {
      //Checks if the div is open and collapses it
      e.target.expanded = false;
      e.target.innerText = "Show";
      Array.from(e.target.parentElement.children[1].children).forEach(
        (li) => {
          li.style.display = "none";
        }
      );
      e.target.parentElement.children[1].classList.remove(
        "card-content-open"
      );
      e.target.parentElement.children[1].classList.add(
        "card-content-closed"
      );
      e.target.parentElement.children[1].classList.remove("card-open");
      e.target.parentElement.classList.remove("card-open");
      e.target.parentElement.classList.add("card-closed");
    }
  }


  async function saveFunction() {
    // Create an object to form the body of our POST request
    if (!saved) {
      let body = {
        ingredientLines: props.recipe.recipe.ingredientLines,
        img: props.recipe.recipe.image,
        label: props.recipe.recipe.label
      }


      console.log(body)
      let bodyString = JSON.stringify(body)

      // Make the fetch request 
      const res = await fetch('http://localhost:3000/user/save', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: bodyString
      })

      setSaved(!saved)
      let resJSON = await res.json()
      console.log(resJSON)
    }
  }


  return (

    <div className="grid-card">
      <img
        src={props.recipe.recipe.image}
        className="card-img"
        alt={props.recipe.recipe.label}
      />
      <span className="recipe-title">{props.recipe.recipe.label}</span>
      {props.isLoggedIn !== null && <span className={!saved && 'save-button'} onClick={saveFunction}>
        {!saved && 'Save recipe'}
        {saved && <span className='save-button-inactive'>Recipe saved!</span>}
      </span>}
      <div className="card-content">
        <span className="show-details show-details-open ingredient-card-tag" onClick={handleClick} v>
          Show
        </span>

        <div className="card-content-closed">
          <ul style={{ display: "none" }}>
            {props.recipe.recipe.ingredientLines.map((ingredientLine) => {
              return <li>{ingredientLine}</li>;
            })}
          </ul>
          <h4 style={{ display: "none" }}>A lovely heading</h4>
          <p style={{ display: "none" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div className="card-content">
        <span className="show-details show-details-open nutrition-card-tag" onClick={handleClick}>
          Show
        </span>

        <div className="card-content-closed">
          <ul style={{ display: "none" }}>
            {props.recipe.recipe.digest.map((i) => {
              return (
                <li><b>{i.label}:</b> {Math.floor(i.total)} {i.unit}</li>
              )
            })}
          </ul>
        </div>

        <div className="recipe-summary-div">
          {props.recipe.recipe.ingredientLines.length} ingredients {props.recipe.recipe.healthLabels.map((label) => { return `| ${label} ` })}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
