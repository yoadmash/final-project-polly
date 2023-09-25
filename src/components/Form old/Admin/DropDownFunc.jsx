import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';
import "./CSS/AdminForm.css";

function DropDownOptions({ typeSelected }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const questionOptions = [
    { id: 1, title: 'Text', type: 'text', icon: '' },
    { id: 2, title: 'Multiple Choices', type: 'checkbox', icon: '' },
    { id: 3, title: 'Single Choice', type: 'radio', icon: '' },
  ];

  const optionHandler = (item) => {
    typeSelected(item.type);
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>
        Choose question type
      </DropdownToggle>
      <DropdownMenu>
        {questionOptions.map(item => (
          <DropdownItem key={item.id} onClick={() => optionHandler(item)}>
            {item.title}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

DropDownOptions.propTypes = {
  typeSelected: PropTypes.func.isRequired,
};

export default DropDownOptions;
