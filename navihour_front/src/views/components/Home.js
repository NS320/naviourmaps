import React from 'react';
import Header from '../common/Header';
import "../../App.css";
import Grid from '@material-ui/core/Grid';
import Map from './maps/Map';
import BackButtons from './maps/BackButtons';
import MyNavigation from './maps/MyNavigation';
import OtherNavigation from './maps/OtherNavigation';

class Home extends React.Component {
    // ToDo
    // ここに初期値をいれてください
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
            },
            route_exist: false
        }
    }

    setStartAddress = (start_address) => {
        this.setState({start_address: start_address});
    }

    setGoalAddress = (goal_address) => {
        this.setState({goal_address: goal_address});
    }
    
    setRouteExist = (route_exist) => {
        this.setState({route_exist: route_exist});
    }

    render() {
            return (
                <div>
                    <Header 
                        App_SetIsLogin = {this.props.App_SetIsLogin}
                    />
                    <Map
                        StartAddress = {this.state.start_address}
                        GoalAddress = {this.state.goal_address}
                        setStartAddress = {this.setStartAddress.bind(this)}
                        setGoalAddress = {this.setGoalAddress.bind(this)}
                        RouteExist = {this.state.route_exist}
                        setRouteExist = {this.setRouteExist.bind(this)}
                    />
                    <BackButtons
                        StartAddress = {this.state.start_address}
                        GoalAddress = {this.state.goal_address}
                        setStartAddress = {this.setStartAddress.bind(this)}
                        setGoalAddress = {this.setGoalAddress.bind(this)}
                    />
                    {/* /ToDo App_UserId の渡し方とかも相談。stateで管理？ */}
                    自分のルート(仮)
                    <MyNavigation
                        App_UserId = {this.props.App_UserId}
                    />
                    他人のルート(仮)
                    <OtherNavigation
                        App_UserId = {this.props.App_UserId}
                    />
                </div>
            );
        }
    }

export default Home;