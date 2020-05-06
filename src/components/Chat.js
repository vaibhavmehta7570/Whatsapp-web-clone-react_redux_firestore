import React, { Component } from 'react';
import { db,auth} from "../services/firebase"
import "../assets/css/Chat.css";
import Contact from "./Contact";
import user_default from "../assets/images/users.svg";
import TextBox from "./TextBox"
class Chat extends Component{
    state={
        users:null
    }   
    componentDidMount(){
        db.collection("users")
            .get()
            .then(snapshot=>{
                const users =[]
                snapshot.forEach(doc=>{
                    const data=doc.data();
                    users.push(data);
                })
                this.setState({users:users})
            })
            .catch(error=>console.log(error))
    }
    render(){
        return(
            <>
            <div className="sidebar">
                <div className="user-detail mt-3 ml-4 mb-4"> 
                    <img src={user_default} alt="current-user-icon" height="40px"/>
                    <button type="button" className="logout-button btn btn-primary float-right mr-3">Logout</button>
                </div>
                <div className="rootsearchbar">
                </div >
                <div className="user_list">
                {
                    this.state.users &&this.state.users.map(user =>{
                        return (
                            <div>
                                <Contact
                                    key={user.email_id}
                                    users={user}
                                />
                            </div>
                            
                        )
                    })
                
                }
                </div>
                
          </div>
          <TextBox />
        </>
              
        )
    }
}
export default Chat;