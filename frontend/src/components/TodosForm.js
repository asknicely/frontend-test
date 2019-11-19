import React from 'react'

const Form = (props) => {
    return (
        <tr>
            <td colSpan="4" align="left">
                <input 
                    type="textbox" 
                    name="description" 
                    className="small-6 small-center" 
                    placeholder="Description..." 
                    value={props.description}
                    onChange={(e) => props.setDescription(e.target.value) }
                />
            </td>
            <td>
                <button 
                    type="submit" 
                    className="btn btn-sm btn-primary"
                    onClick={props.handleSubmit}
                >
                Add
                </button>
            </td>
        </tr>
    )
}

export default Form