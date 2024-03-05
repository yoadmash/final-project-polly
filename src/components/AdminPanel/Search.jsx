import React, { useState } from 'react'
import { Button, Input } from 'reactstrap';

const Search = ({ data, searchFunc, setSearchResult, placeholder }) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <form className='d-flex gap-2 mt-3' onSubmit={(e) => {
            e.preventDefault();
            return searchFunc(searchValue);
        }}>
            <Input type='text' placeholder={placeholder}
                onChange={(e) => e.target.value.length > 0 ? setSearchValue(e.target.value) : setSearchResult(data)} />
            <Button color='success' type='submit'>Search</Button>
            <Button color='danger' type='reset' onClick={() => {
                setSearchValue('');
                setSearchResult(data);
            }}>Clear</Button>
        </form>
    )
}

export default Search