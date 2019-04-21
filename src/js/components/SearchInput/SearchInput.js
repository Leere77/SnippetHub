import React from "react"
import "./SearchInput.scss"

function SearchInput({placeholder, block, handler}) {
  return (
    <div className={block + "__search search"}>
      <input type="text" name="" className="search__input" placeholder={placeholder} onKeyDown={e => handler(e)}/>
      <button className="search__btn">
        <span className="fas fa-search"></span>
      </button>
    </div>
  )
}

export default SearchInput 