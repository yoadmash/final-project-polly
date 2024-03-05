import React from 'react'
import PollPic from './PollPic';
import Active from './Active';
import Actions from './Actions';
import { Link } from 'react-router-dom';

const Poll = ({ poll, setPoll, setModal }) => {
    const props = ['image_path', 'title', 'owner', 'creation_datetime', 'answers', 'settings', 'actions'];

    return (
        <tr>
            {props.map((prop, index) => {
                let data = undefined;
                switch (prop) {
                    case "image_path":
                        data = <PollPic src={poll[prop]} />
                        break;
                    case "title":
                        data = <Link to={`/poll/${poll._id}?admin_visit=true`}>{poll.title}</Link>
                        break;
                    case "owner":
                        data = String(poll[prop].username);
                        break;
                    case "settings":
                        data = <div className='d-flex flex-column gap-1'>
                            {Object.entries(poll.settings).map((pollEnteries, index) => {
                                let propName = '';
                                switch (pollEnteries[0]) {
                                    case 'usersCanDeleteAnswer':
                                        propName = 'Users can delete their answers'
                                        break;
                                    case 'submitAnonymously':
                                        propName = 'Submit anonymously'
                                        break;
                                    case 'shuffleQuestionsOrder':
                                        propName = 'Shuffle questions'
                                        break;
                                }
                                return (
                                    <div key={index} column="settings" className='d-flex gap-1 align-items-end'>
                                        <span>{propName}:</span>
                                        <Active active={pollEnteries[1]} />
                                    </div>
                                )
                            })}
                        </div>
                        break;
                    case 'actions':
                        data = <Actions poll={poll} setPoll={setPoll} setModal={setModal} />
                        break;
                    default:
                        data = String(poll[prop]);
                        break;
                }
                return <td key={index} className='align-middle p-2'>{data !== 'undefined' && data}</td>
            })}
        </tr>
    )
}

export default Poll