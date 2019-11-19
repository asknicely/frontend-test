import React from 'react'

const Loader = () => {
    return (
        <div>
            <div className="preloader">
                <div className="image">
                    <img src="images/loading.gif" alt="Loading ..."></img>
                </div>
                <div className="text">
                    Loading data from database ...
                </div>
            </div>
        </div>
    )
}

export default Loader