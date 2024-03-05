import React from 'react'
import Actions from './Actions';
import Show from './Show';

const Template = ({ template, setTemplate }) => {
    const props = ['title', 'show', 'actions'];

    return (
        <tr>
            {props.map((prop, index) => {
                let data = undefined;
                switch (prop) {
                    case 'show':
                        data = <Show show={template.show} />;
                        break;
                    case 'actions':
                        data = <Actions template={template} setTemplate={setTemplate} />;
                        break;
                    default:
                        data = String(template[prop]);
                        break;
                }
                return <td key={index} className='align-middle p-2'>{data !== 'undefined' && data}</td>
            })}
        </tr>
    )
}

export default Template