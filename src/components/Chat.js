import React, { Component } from 'react';
import { connect } from "react-redux";
import { db} from "../services/firebase"
import "../assets/css/Chat.css";
import Contact from "./Contact";
import user_default from "../assets/images/users.svg";
import TextBox from "./TextBox"
import search from "../assets/images/search.svg"
import {getUsers,searchContacts} from "../reducers/index";
class Chat extends Component{
    constructor (props){
        super(props);
        this.state={
            searchString:"",
        }   
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
                // this.setState({users:users})
                this.props.getUsers(users);
            })
            .catch(error=>console.log(error))
    }
    handelOnInputChange=(event)=>{
        let {users}=this.props
        const searchString=event.target.value;
        console.log(searchString);
        this.setState({ searchString:searchString },()=>{
            if(this.state.searchString === ""){
                db.collection("users")
            .get()
            .then(snapshot=>{
                const users =[]
                snapshot.forEach(doc=>{
                    const data=doc.data();
                    users.push(data);
                })
                // this.setState({users:users})
                this.props.getUsers(users);
            })
            .catch(error=>console.log(error))
            }
            let foundusers=users.filter(user=>user.username.toLowerCase().includes(this.state.searchString.toLowerCase()))
            this.props.searchContacts(foundusers);
            // console.log(foundusers);
        })
    }

    render(){
        console.log(this.state.searchedValue);
        return(
            <>
            <div className="sidebar">
                <div className="user-detail mt-3 ml-4 mb-3"> 
                    <img src={user_default} alt="current-user-icon" height="40px"/>
                    <button type="button" className="logout-button btn btn-primary float-right mr-3">Logout</button>
                </div>
                <div className="flex mb-2">
                    <input type="text" placeholder="Search.." className="search" onChange={this.handelOnInputChange} />
                    <img src={search} alt="search" className="search-icon"/>
                </div>
                <div className="user_list">
                {
                    this.props.users ? this.props.users.map(user=>{
                        return (
                            
                                        <Contact
                                            key={user.email_id}
                                            users={user}
                                        />
                                    
                                )
                    }): null
                }
                </div>
                
          </div>
          <div className="initial-text tc align-center">
            <h1> Welcome!</h1>
            <h3> Let's connect to the world..</h3>
          </div>
          <TextBox />
        </>
              
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        users:state.users
    };
};
const mapDispatchToProps=(dispatch)=>{
    return{
        getUsers:(data)=>dispatch(getUsers(data)),
        searchContacts:(data)=>dispatch(searchContacts(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);