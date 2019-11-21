const handleDelete = (id) => {
    console.log('handleDelete', id)
}

const handleComplete = (id) => {
    console.log('handleComplete', id)
}

const todos = [
    {
        id: '1',
        user_id: '345',
        description: 'Going out to beach',
        completed: 0,
        handleDelete,
        handleComplete
    },
    {

        id: '2',
        user_id: '345',
        description: 'Going out to shopping mall',
        completed: 1,
        handleDelete,
        handleComplete
    },    
    {

        id: '3',
        user_id: '345',
        description: 'Going out to university',
        completed: 0,
        handleDelete,
        handleComplete
    },       
]

export default todos
