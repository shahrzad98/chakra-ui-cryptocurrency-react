import React, {useState} from 'react';
import {Col, Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import MenuProfileStyle from "./MenuProfileStyle";
import Img from "components/Img";


const Example = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={dropdownOpen}
                >
                    <MenuProfileStyle>
                        <span>
                        <Img padding="0 20px 0 0" src={require('images/notifications-button.svg')}/>

                         </span>
                    </MenuProfileStyle>
                </DropdownToggle>

                <DropdownMenu>
                    nnn
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default Example;