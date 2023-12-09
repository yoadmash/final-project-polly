import React, { useEffect, useRef } from 'react';
import PollCardSearch from './PollCardSearch';

const SearchResults = ({ control }) => {
    const ref = useRef();

    useEffect(() => {
        ref.current.focus();
    })

    return (
        <div
            className="search-results"
            ref={ref}
            tabIndex={0}
            onBlur={() => control.setResults([])}
            onClick={() => control.setResults([])}
        >
            <h5>Search results for: '{control.searchValue}'</h5>
            {control.results.map((poll) => <PollCardSearch key={poll._id} id={poll._id} poll={poll} />)}
        </div>
    )
}

export default SearchResults