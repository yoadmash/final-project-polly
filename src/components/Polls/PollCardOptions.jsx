import React, { useContext, useState } from 'react';
import AppContext from '../../contexts/AppContext';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function PollCardOptions({ actionFunction, owner }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const { pollCardOptions } = useContext(AppContext);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'left'}>
      <DropdownToggle><img src="/assets/images/dots.svg" alt="dots" /></DropdownToggle>
      <DropdownMenu>
        <DropdownItem key={'owner'} disabled>Created by: {owner}</DropdownItem>
        <DropdownItem key={'top-divider'} divider>{owner}</DropdownItem>
        {pollCardOptions.map((item, i) => {
          if (i === pollCardOptions.length - 1) {
            return ([
              <DropdownItem key={'bottom-divider'} divider />,
              <DropdownItem key={i} onClick={() => actionFunction(item.title)}>
                <img src={item.icon} alt={item.title} />
                <span>{item.title}</span>
              </DropdownItem>
            ]);
          } else {
            return <DropdownItem key={i} onClick={(event) => actionFunction(item.title)}>
              <img src={item.icon} alt={item.title} />
              <span>{item.title}</span>
            </DropdownItem>;
          }
        })}
      </DropdownMenu>
    </Dropdown>
  );
}

export default PollCardOptions;