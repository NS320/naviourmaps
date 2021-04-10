import React from 'react';
import Header from '../common/Header';
import Address from './Address'
import "../../App.css";

class Home extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
            return (
                <div>
                    <Header 
                        App_SetIsLogin = {this.props.App_SetIsLogin}
                    />
                    <Address 
                        App_UserId = {localStorage.getItem("user_id")}
                    />
                </div>
            );
        }
    }

export default Home;