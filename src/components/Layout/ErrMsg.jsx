import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ErrMsg = ({ msg }) => {
    return (
        <>
            {msg && <div className={'general-err-msg mt-2'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>{msg}</span>
            </div>}
        </>
    )
}

export default ErrMsg