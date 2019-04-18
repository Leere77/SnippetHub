import React from "react"

import "./Card.scss"

const Card = ({title, tags, desc, metrics = undefined}) => {

    const tagList = tags.map(tag => {
        return <a href="" className="c-tags__item link" key={tag}>#{tag}</a>
    })

    return (
        <div className="c-card">
            <a className="c-card__title link" href=''>{title}</a>

            <div className="c-card__tags c-tags">
                {tagList}
            </div>

            <div className="c-card__description">
                <p>{desc}</p>
            </div>
            {metrics &&
            <div className="c-card__metrics">
                <span className="c-card__views">
                    <span className="fas fa-eye"></span>
                    {metrics.views}
                </span>

                <span className="c-card__likes">
                    <span className="fas fa-heart"></span>
                    {metrics.likes}
                </span>
            </div>
            }
        </div>
    )
}

export default Card