import React, { useState } from 'react'
import { Button, Input } from 'reactstrap';

const Search = ({ data, searchFunc, setSearchResult, placeholder }) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <form className='d-flex gap-2 mt-3' onSubmit={(e) => {
            e.preventDefault();
            return searchFunc(searchValue);
        }}>
            <Input type='search' placeholder={placeholder}
                onChange={(e) => e.target.value.length > 0 ? setSearchValue(e.target.value) : setSearchResult(data)} />
            <Button color='success' type='submit'>Search</Button>
        </form>
    )
}

export default Search