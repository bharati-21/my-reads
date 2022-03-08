import React from 'react'

const SearchForm = ({searchText ,dispatch}) => {

    const searchBook = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={searchBook} className="form">
            <input type="search" placeholder="Search Books..."  required value={searchText} onChange={e => dispatch({type: 'SET_SEARCH_TEXT', payload: e.target.value})} />
            <input type="submit" value="Search"/>
        </form>
    )
}

export {SearchForm};