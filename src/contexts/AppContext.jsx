import React, {createContext, useState} from 'react';

const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [sortOptions, setSortOptions] = useState([
        'All polls',
        'Polls owned by me',
        "Polls owned by others"
    ]);

    const [pollCardOptions, setPollCardOptions] = useState([
        {icon: '/assets/images/edit.svg', title: 'Edit'},
        {icon: '/assets/images/rename.svg', title: 'Rename'},
        {icon: '/assets/images/view_answers.svg', title: 'View answers'},
        {icon: '/assets/images/open_new_tab.svg', title: 'Open in new tab'},
        {icon: '/assets/images/remove.svg', title: 'Remove'},
    ]);

    const [questionOptions, setQuestionOptions] = useState([
        { id: 1, title: 'Text', type: 'text', icon: '' },
        { id: 2, title: 'Multiple Choices', type: 'radio', icon: '' },
        { id: 3, title: 'Checkboxes', type: 'checkbox', icon: '' },
    ]);

    const [newPollTemplates, setNewPollTemplates] = useState([
        'Template 1',
        'Template 2',
        'Template 3',
        'Template 4',
        'Template 5'
    ]);

    return (
        <AppContext.Provider
            value={{
                sortOptions,
                setSortOptions,
                pollCardOptions,
                setPollCardOptions,
                questionOptions,
                setQuestionOptions,
                newPollTemplates,
                setNewPollTemplates
            }}
        > {children}
        </AppContext.Provider>
    )

}

export default AppContext;