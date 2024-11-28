import React from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';

const Actions = ({ template, setTemplate }) => {

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const actions = [
        { title: `${template.show ? "Hide" : "Show"}`, icon_src: `${template.show ? '/assets/images/hide.svg' : '/assets/images/show.svg'}`, action: 'show-hide-template' },
        { title: 'Edit', icon_src: '/assets/images/edit.svg', action: 'edit-template' },
        { title: 'Delete', icon_src: '/assets/images/remove.svg', action: 'delete-template' },
    ]

    const preformAction = async (action) => {
        switch (action) {
            case "show-hide-template":
                template.show = !template.show;
                showOrHideTemplate();
                setTemplate(template._id, template);
                break;
            case "edit-template":
                editTemplate();
                break;
            case "delete-template":
                deleteTemplate();
                setTemplate(template._id, null);
                break;
            default:
                break;
        }
    }

    const showOrHideTemplate = async () => {
        try {
            await axiosPrivate.post(`/polls/templates/show-or-hide`, {id: template._id, showStatus: template.show});
            toast.success('Template visible status changed', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "light",
                transition: Slide,
            })
        } catch (err) {
            toast.error(err || 'An error has been occurred', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "light",
                transition: Slide,
            })
        }
    }

    const editTemplate = async () => {
        navigate(`/template/${template._id}/edit`);
    }

    const deleteTemplate = async () => {
        try {
            await axiosPrivate.post(`/polls/templates/delete?id=${template._id}`);
            toast.success('Template deleted', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "light",
                transition: Slide,
            })
        } catch (err) {
            toast.error(err || 'An error has been occurred', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "light",
                transition: Slide,
            })
        }
    }

    return (
        <ul>
            {actions.map((item, index) => (
                <li
                    key={index}
                    title={item.title}
                    onClick={() => preformAction(item.action)}
                >
                    <img
                        className='actions'
                        src={item.icon_src}
                        alt={item.title}
                    />
                </li>
            ))}
        </ul>
    )
}

export default Actions