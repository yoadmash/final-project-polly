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
    { icon: '/assets/images/link.svg', title: 'Copy Link' },
    { icon: '/assets/images/view_answers.svg', title: 'View Answers' },
    { icon: '/assets/images/open_new_tab.svg', title: 'Open in new tab' },
    { icon: '/assets/images/remove.svg', title: (auth.username === owner) ? 'Delete Poll' : 'Remove' },
  ];

  const pollCardOptionsToMap = (auth.username === owner)
    ? pollCardOptions
    : pollCardOptions.filter(option => option.title !== 'Edit');

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'start'}>
      <DropdownToggle><img src="/assets/images/dots.svg" alt="dots" /></DropdownToggle>
      <DropdownMenu>
        <DropdownItem key={'owner'} disabled>Created by: {owner}</DropdownItem>
        <DropdownItem key={'top-divider'} divider>{owner}</DropdownItem>
        {pollCardOptionsToMap.map((item, i) => {
          if (item.title === 'Delete Poll' || item.title === 'Remove') {
            return ([
              <DropdownItem key={'bottom-divider'} divider />,
              <DropdownItem key={i} onClick={() => actionFunction(item.title)}>
                <img src={item.icon} alt={item.title} />
                <span>{item.title}</span>
              </DropdownItem>
            ]);
          } else {
            return (
              <DropdownItem key={i} onClick={() => actionFunction(item.title)} >
                <img src={item.icon} alt={item.title} />
                <span>{item.title}</span>
              </DropdownItem>
            )
          }
        })}
      </DropdownMenu>
    </Dropdown >
  );
}

export default PollCardOptions;