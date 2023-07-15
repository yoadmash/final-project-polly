import React, { useContext, useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import "./DropDownCss.css";
import AppContext from '../../../Context/AppContext';

function DropDownOptions( {typeSelected} ) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [selectedOption, setSelectedOption] = useState('Choose question type');
  const { options } = useContext(AppContext);

  const optionHandler = (item) => {
    typeSelected(item.type);
    setSelectedOption(item.title);
  }

  return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>{selectedOption}</DropdownToggle>
          <DropdownMenu>
            {options.map(item => <DropdownItem key={item.id} onClick={() => optionHandler(item)}>{item.title}</DropdownItem>)}
          </DropdownMenu>
        </Dropdown>
  );
}

DropDownOptions.propTypes = {
  direction: PropTypes.string,
};

export default DropDownOptions;
