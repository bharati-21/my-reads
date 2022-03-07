import React from 'react'

const SearchForm = ({searchBook, searchText ,dispatch}) => {
    return (
        <form onSubmit={searchBook} className="form">
            <input type="search" placeholder="Search Books..."  required value={searchText} onChange={e => dispatch({type: 'SET_SEARCH_TEXT', payload: e.target.value})} />
            <input type="submit" value="Search"/>
        </form>
    )
}

export {SearchForm};