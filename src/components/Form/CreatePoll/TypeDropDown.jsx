import { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const TypeDropDown = ({ defaultValue, setAnswersType }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(defaultValue);

    const toggle = () => setDropdownOpen((prevState) => !prevState);


    const optionHandler = (item) => {
        setSelectedOption(item.type);
        setAnswersType(item.type);
    };

    const questionOptions = [
        { id: 1, title: 'Text', type: 'text', icon: '/assets/images/text.svg' },
        { id: 2, title: 'Single Answer', type: 'radio', icon: '/assets/images/radio-btn.svg' },
        { id: 3, title: 'Multiple Answers', type: 'checkbox', icon: '/assets/images/checkbox.svg' },
    ];

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{ width: '100%' }}>
            <DropdownToggle caret style={{ width: '100%' }}>
                {questionOptions.find(item => item.type === selectedOption).title}
            </DropdownToggle>
            <DropdownMenu>
                {questionOptions.map(item => (
                    <DropdownItem key={item.id} onClick={() => optionHandler(item)}>
                        <img src={item.icon} alt="" />
                        {item.title}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}

export default TypeDropDown