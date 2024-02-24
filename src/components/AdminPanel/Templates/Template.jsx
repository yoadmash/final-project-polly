import React from 'react'

const Template = ({ template }) => {
    const props = ['name', 'show', 'actions'];

    return (
        <tr>
            {props.map((prop, index) => {
                let data = undefined;
                switch (prop) {
                    case 'actions':
                        data = 'actions will be here';
                        break;
                    default:
                        data = template[prop];
                        break;
                }
                return <td key={index} className='align-middle p-2'>{String(data)}</td>
            })}
        </tr>
    )
}

export default Template