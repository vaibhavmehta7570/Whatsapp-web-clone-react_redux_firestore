import React, { Component } from "react";
import user_default from "../assets/images/users.svg";
import "../assets/styles/Chat.css";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      contactArrowOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  
  handleClickOutside = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        contactArrowOpen: false,
      });
    }
  };

  handleButtonClick = () => {
    this.setState(state => {
      return {
        contactArrowOpen: !state.contactArrowOpen,
      };
    });
  };

  render() {
    return (
      <div className="container-contact users" onClick={() => this.props.onClickUser(this.props.users)}>
        <div className="user-dp mt-2 ml-2 contact-list" >
          <img src={props.users.profile_pic || user_default} height="50px" alt="contact" />
          <p className="userName mt-3">{this.props.users.username}</p>
        </div>
        <div className="container-drop mt-3" ref={this.container} >
          <img type="button" src="https://img.icons8.com/android/24/000000/expand-arrow.png" alt="down arrow" className="down-arrow" onClick={this.handleButtonClick} />
            {this.state.contactArrowOpen && (
              <div className="dropdown-contact">
                <ul>
                  <li>Archive chat</li>
                  <li>Mute notification</li>
                  <li>Delete Chat</li>
                  <li>Mark as unread</li>
                </ul>
              </div>
            )}
        </div>
      </div>
    );
  };
}

export default Contact;
