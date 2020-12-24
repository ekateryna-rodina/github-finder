import React, {Fragment} from 'react'
import Loading_icon from './Loading_icon.gif'

export const Spinner = () => 
    <Fragment>
        <img src={Loading_icon} alt="Loading...." style={{width: '200px', margin: "auto", display: "block"}}/>
    </Fragment>
export default Spinner