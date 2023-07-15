import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function PollSort() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
        <DropdownToggle caret>Sort</DropdownToggle>
        <DropdownMenu>
          <DropdownItem>All polls</DropdownItem>
          <DropdownItem>Polls owned by me</DropdownItem>
          <DropdownItem>Polls owned by others</DropdownItem>
        </DropdownMenu>
      </Dropdown>
  );
}

export default PollSort;