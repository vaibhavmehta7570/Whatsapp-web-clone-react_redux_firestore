import React, { Component } from 'react';
import { connect } from "react-redux";
import { db} from "../services/firebase"
import "../assets/css/Chat.css";
import Contact from "./Contact";
import user_default from "../assets/images/users.svg";
import TextBox from "./TextBox"
import search from "../assets/images/search.svg"
import {setUsers} from "../reducers/index";
class Chat extends Component{
    state={
        // users:null,
        search:"",
        searchEnable:false,
        searchedValue:[]
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
                this.props.setUsers(users);
            })
            .catch(error=>console.log(error))
    }
    // onchange = e =>{
    //         let search=e.taget.value
    //         this.setState((state)=>({
    //             searchedValue: state.users.filter((user)=>{
    //                 return (user.username.includes(search))
    //             })
    //         }))   
    // }

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
                    <input type="text" placeholder="Search.." className="search" onChange={this.onchange} />
                    <img src={search} alt="search" className="search-icon"/>
                </div>
                <div className="user_list">
                {
                    this.props.users&&this.props.users.map(user=>{
                        return (
                            
                                        <Contact
                                            key={user.email_id}
                                            users={user}
                                        />
                                    
                                )
                    })

                    //     (this.state.searchEnable===false)? this.state.users && this.state.users.map(user =>{
                    //     return (
                            
                    //             <Contact
                    //                 key={user.email_id}
                    //                 users={user}
                    //             />
                            
                    //     )
                    // }) :
                    // this.state.searchedValue && this.state.searchedValue.map(user =>{
                    //     console.log(this.state.searchedValue);
                    //     return (
                        
                    //             <Contact
                    //                 key={user.email_id}
                    //                 users={user}
                    //             />
                            
                            
                    //     )
                    // })

                
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
        users:state.user
    };
};
const mapDispatchToProps=(dispatch)=>{
    return{
        setUsers:(data)=>dispatch(setUsers(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);