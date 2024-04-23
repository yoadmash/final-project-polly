import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function PollSort({ polls, setPollsToRender }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState('All polls');

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const sortPolls = (sortOption) => {
    switch (sortOption) {
      case 'All polls':
        setPollsToRender([...polls.created, ...polls.answered, ...polls.visited]);
        break;
      case 'Created polls':
        setPollsToRender([...polls.created]);
        break;
      case 'Answered polls':
        setPollsToRender([...polls.answered]);
        break;
      case 'Visited polls':
        setPollsToRender([...polls.visited]);
        break;
      default:
        break;
    }
    setSortOption(sortOption);
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
      <DropdownToggle caret>{sortOption}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => sortPolls('All polls')}>All polls</DropdownItem>
        <DropdownItem onClick={() => sortPolls('Created polls')}>Created polls</DropdownItem>
        <DropdownItem onClick={() => sortPolls('Answered polls')}>Answered polls</DropdownItem>
        <DropdownItem onClick={() => sortPolls('Visited polls')}>Visited polls</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default PollSort;