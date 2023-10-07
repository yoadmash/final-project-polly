import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import useAuth from '../../hooks/useAuth';

function PollCardOptions({ actionFunction, owner }) {
  const { auth } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const pollCardOptions = [
    { icon: '/assets/images/edit.svg', title: 'Edit' },
    { icon: '/assets/images/text.svg', title: 'Rename' },
    { icon: '/assets/images/view_answers.svg', title: 'View answers' },
    { icon: '/assets/images/open_new_tab.svg', title: 'Open in new tab' },
    { icon: '/assets/images/remove.svg', title: 'Remove' },
  ];

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'left'}>
      <DropdownToggle><img src="/assets/images/dots.svg" alt="dots" /></DropdownToggle>
      <DropdownMenu>
        <DropdownItem key={'owner'} disabled>Created by: {owner}</DropdownItem>
        <DropdownItem key={'top-divider'} divider>{owner}</DropdownItem>
        {pollCardOptions.map((item, i) => {
          if (i === pollCardOptions.length - 1) { //remove
            return ([
              <DropdownItem key={'bottom-divider'} divider />,
              <DropdownItem key={i} onClick={() => actionFunction(item.title)}>
                <img src={item.icon} alt={item.title} />
                <span>{item.title}</span>
              </DropdownItem>
            ]);
          } else { // every other option
            return <DropdownItem key={i} onClick={() => actionFunction(item.title)} disabled={(item.title === 'Edit' || item.title === 'Rename') && auth.username !== owner}>
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