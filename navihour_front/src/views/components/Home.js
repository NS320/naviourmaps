import React from 'react';
import Header from '../../utils/Header';
import Address from './Address'
import "../../App.css";

class Home extends React.Component {
    render() {
            return (
                <div>
                    <Header />
                    <Address 
                        App_UserId = {localStorage.getItem("user_id")}
                    />
                </div>
            );
        }
    }

export default Home;