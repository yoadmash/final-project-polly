import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

function DropDownOptions({ typeSelected }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('text'); // Default selection

  const toggle = () => setDropdownOpen((prevState) => !prevState);


  const optionHandler = (item) => {
    setSelectedOption(item.type); // Update the selected option when an item is clicked
    typeSelected(item.type);
  };

  const questionOptions = [
    { id: 1, title: 'Text', type: 'text', icon: '' },
    { id: 2, title: 'Multiple Choices', type: 'checkbox', icon: '' },
    { id: 3, title: 'One Choice', type: 'radio', icon: '' },
  ];


  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{ width: '100%' }}>
      <DropdownToggle caret style={{ width: '100%' }}>
        {selectedOption === 'text' ? 'Text' : questionOptions.find(item => item.type === selectedOption).title}
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

export default DropDownOptions;
