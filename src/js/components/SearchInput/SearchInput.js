import React from "react"
import "./SearchInput.scss"

function SearchInput({placeholder, block}) {
  return (
    <div className={block + "__search search"}>
      <input type="text" name="" className="search__input" placeholder={placeholder}/>
      <button className="search__btn">
        <span className="fas fa-search"></span>
      </button>
    </div>
  )
}

export default SearchInput 