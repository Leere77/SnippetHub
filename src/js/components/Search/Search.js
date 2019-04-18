import React, { useState } from "react"

import Card from "../Card/Card"
import "./Search.scss"

//TODO: make a css-block that wraps flex cards and pagination (pagination always in the bottom)

const results = [{
        title: 'Quicksort one',
        tags: ['One', 'Two'],
        desc: 'Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm, serving as a systematic method for placing the elements of a random access file or an array in order. Developed by British computer scientist Tony Hoare in 1959',
        metrics: {
            views: 12,
            likes: 3
        }
    },
    {
        title: 'Quicksort two',
        tags: ['Hee Hee', 'Entschuldigung bitte'],
        desc: 'Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm',
        metrics: {
            views: 12,
            likes: 3
        }
    },
    {
        title: 'Quicksort three',
        tags: ['One', 'Two'],
        desc: 'Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm, serving as a systematic method for placing the elements of a random access file or an array in order. Developed by British computer scientist Tony Hoare in 1959',
        metrics: {
            views: 12,
            likes: 3
        }
    },
    {
        title: 'Quicksort four',
        tags: ['Hee Hee', 'Entschuldigung bitte'],
        desc: 'Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm',
        metrics: {
            views: 12,
            likes: 3
        }
    },
    {
        title: 'Quicksort five',
        tags: ['Hee Hee', 'Entschuldigung bitte'],
        desc: 'Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm',
        metrics: {
            views: 12,
            likes: 3
        }
    },
    {
        title: 'Quicksort six',
        tags: ['Hee Hee', 'Entschuldigung bitte'],
        desc: 'Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm',
        metrics: {
            views: 12,
            likes: 3
        }
    },
    {
        title: 'Quicksort seven',
        tags: ['Hee Hee', 'Entschuldigung bitte'],
        desc: 'Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm',
        metrics: {
            views: 12,
            likes: 3
        }
    },
    {
        title: 'Quicksort eigth',
        tags: ['Hee Hee', 'Entschuldigung bitte'],
        desc: 'Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm',
        metrics: {
            views: 12,
            likes: 3
        }
    },
    {
        title: 'Quicksort nine',
        tags: ['Hee Hee', 'Entschuldigung bitte'],
        desc: 'Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm',
        metrics: {
            views: 12,
            likes: 3
        }
    },
    {
        title: 'Quicksort ten',
        tags: ['Hee Hee', 'Entschuldigung bitte'],
        desc: 'Quicksort (sometimes called partition-exchange sort) is an efficient sorting algorithm',
        metrics: {
            views: 12,
            likes: 3
        }
    }
]

//  1+ 2 3 4 
//  1+ 2 ..
//  .. 2 3+ 4 5 .. 
//  .. 2 3+ 4 5

function PaginationItem({handler, current = false, enable = true, index, content = ''}) {
    const classes = `pagination__item${current ? ' pagination__item--current':''}${!enable  ? ' pagination__item--disabled':''}`

    return <li 
            className={classes} 
            onClick={() => handler(index)}>
            {content ? content : index}
        </li>
}

function Pagination({handler, currentPage, resultsLength, cardsPerPage}) {
    const pageRange = 3, minPageCount = 5
    let pageCount = Math.ceil(resultsLength / cardsPerPage)
    let pages =  [...Array(pageCount)]

    console.log(pageCount)

    if(pageCount < 2) 
        return (
            <ul className="pagination">
                <PaginationItem handler={handler} index={1} current={true}/>
            </ul>)
    
    pages = pages.map((page, index) => {
        index++
        if(index == 1 || index == pageCount) return

        if(pageCount < minPageCount) {
            return index == currentPage ? 
                    <PaginationItem handler={handler} index={index} current={true}/> :
                    <PaginationItem handler={handler} index={index}/>
        } else {
            if(Math.abs(currentPage - index) < pageRange)
                return index == currentPage ? 
                    <PaginationItem handler={handler} index={index} current={true}/> :
                    <PaginationItem handler={handler} index={index}/>
            else if(Math.abs(currentPage - index) == pageRange)
                return <PaginationItem handler={handler} index={1} content={'...'}/>
        }
    })

    return (
        <ul className="pagination">
            {currentPage != 1 && <PaginationItem handler={handler} index={currentPage - 1} content={'Prev'}/>}
            <PaginationItem handler={handler} index={1} current={currentPage == 1}/>
            {pages}
            <PaginationItem handler={handler} index={pageCount} current={currentPage == pageCount}/>
            {currentPage != pageCount && <PaginationItem handler={handler} index={currentPage + 1} content={'Next'}/>}
        </ul>
    )
}

const Search = () => {
    const [page, setPage] = useState(1)
    const cardsPerPage = 9
    let emptyCards = ''

    /* fill empty space in the last row so that the last card save its width state */

    if(results.length % 3 == 1)
        emptyCards = 
            <>
                <div className="c-card l-search__item l-search__item--empty"></div>
                <div className="c-card l-search__item l-search__item--empty"></div>
            </>
    else if (results.length % 3 == 2)
        emptyCards = <div className="c-card l-search__item l-search__item--empty"></div>

    return (
            <div className="l-center">
                <h1 className="l-center__title">Search results by: "Quicksort"</h1>

                <div className="l-search">
                    {results.slice((page - 1) * cardsPerPage, page * cardsPerPage).map(card => 
                        <div className="l-search__item">
                            <Card 
                                title={card.title}
                                tags={card.tags}
                                desc={card.desc.length > 125 ? card.desc.slice(0,125).concat('...') : card.desc}
                                key={card.title}
                            />
                        </div>)
                    }
                    {emptyCards}
                </div>

                <Pagination
                    handler={setPage}
                    currentPage={page}
                    resultsLength={results.length}
                    cardsPerPage={cardsPerPage}
                />
            </div>
    )
}

export default Search