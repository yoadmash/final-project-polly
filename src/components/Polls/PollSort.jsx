import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function PollSort() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState('All polls');

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
        <DropdownToggle caret>{sortOption}</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setSortOption('All polls')}>All polls</DropdownItem>
          <DropdownItem onClick={() => setSortOption('Created polls')}>Created polls</DropdownItem>
          <DropdownItem onClick={() => setSortOption('Answered polls')}>Answered polls</DropdownItem>
        </DropdownMenu>
      </Dropdown>
  );
}

export default PollSort;