
//Our 404 page

import React, {Component} from 'react';


import error from './images/Error.svg'

class Error extends Component{
    render(){
        return(
            <div id="error_page">
                 <p> Whoops! An error has occured. </p>
                <img id="error_img" alt="" src={error} />
               
            </div>
        )
    }
}

export default Error;