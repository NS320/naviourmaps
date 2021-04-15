import React from 'react';
import Header from '../common/Header';
import "../../App.css";
import Grid from '@material-ui/core/Grid';
import Map from './maps/Map';
import HomeButtons from './maps/HomeButtons';

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            start_address: {          
                address: "",  
                lat: null,
                lng: null
            },
            goal_address: {   
                address: "",           
                lat: null,
                lng: null
            }
        }
    }

    setStartAddress = (start_address) => {
        this.setState({start_address: start_address});
    }

    setGoalAddress = (goal_address) => {
        this.setState({goal_address: goal_address});
    }
    
    render() {
            return (
                <div>
                    <Header 
                        App_SetIsLogin = {this.props.App_SetIsLogin}
                    />
                    <Map 
                        GoalAddress = {this.state.goal_address}
                    />
                    <HomeButtons
                        StartAddress = {this.state.start_address}
                        GoalAddress = {this.state.goal_address}
                        setStartAddress = {this.setStartAddress.bind(this)}
                        setGoalAddress = {this.setGoalAddress.bind(this)}
                    />
                </div>
            );
        }
    }

export default Home;