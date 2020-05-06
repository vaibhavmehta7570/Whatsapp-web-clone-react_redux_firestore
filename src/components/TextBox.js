import React, { Component } from 'react';
import send from "../assets/images/send-button.svg";
import "../assets/css/TextBox.css";
class TextBox extends Component{
    render(){
        return(
            <div className="text-box">
                <div className="inline-block">
                    <input className="input mt-4" placeholder="Enter the message..." type="text" />
                </div>
                <div className="inline-block">
                    <img className="send ml-4" src={send} alt="send"/>
                </div>
            </div>

        )
    }
}
export default TextBox;