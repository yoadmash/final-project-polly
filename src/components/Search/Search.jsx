import React from 'react';
import './Search.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useState } from 'react';
import SearchResults from './SearchResults';

export default function Search() {

  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState('');

  const searchPolls = async (event) => {
    setSearchValue(event.target.value);
    if (event.key === 'Enter' && event.target.value.length > 0) {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.post('/polls/search', { searchValue: event.target.value });
        if (response.data) {
          setResults(response.data.searchResults);
          event.target.value = '';
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className='dashboard-search'>
      <input
        autoComplete='off'
        type="text"
        name='search'
        placeholder='Search poll'
        title='Search poll'
        defaultValue={searchValue}
        onKeyDown={(e) => searchPolls(e)}
        className={isLoading ? 'loading' : ''}
      />
      {results.length > 0 && <SearchResults control={{ results, setResults, searchValue }} />}
    </div>
  )
}
