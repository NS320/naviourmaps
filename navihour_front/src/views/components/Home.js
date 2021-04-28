import React from 'react';
import Header from '../common/Header';
import "../../App.css";
import Map from './maps/Map';
import BackButtons from './maps/BackButtons';
import MyNavigation from './maps/MyNavigation';
import OtherNavigation from './maps/OtherNavigation';
import ArroundRestaurant from './maps/AroundRestaurant';
import NavigationSaveButton from './maps/NavigationSaveButton';

class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            map: {},
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
            route_exist: false,
            restaurants: [],
            directionsRenderer: null
        }
        this.reloadRef = React.createRef();
    }

    setMap = (map) => {
        this.setState({ map: map });
    }

    setStartAddress = (start_address) => {
        this.setState({ start_address: start_address });
    }

    setGoalAddress = (goal_address) => {
        this.setState({ goal_address: goal_address });
    }

    setRouteExist = (route_exist) => {
        this.setState({ route_exist: route_exist });
    }

    setRestaurants = (restaurants) => {
        this.setState({ restaurants: restaurants })
    }

    setDirectionsRenderer = (directionsRenderer) => {
        this.setState({ directionsRenderer: directionsRenderer })
    }

    reloadMyNavigation() {
        // MyNavigatioonのメソッドを親から叩くための設定
        this.reloadRef.current.reload(); // this.ref名.currentで実体にアクセス
    }

    render() {
        return (
            <div>
                <Header
                    App_SetIsLogin={this.props.App_SetIsLogin}
                />
                <div className="navigation-base">
                    <div className="side-by-side">
                        <div className="map-and-save">
                            <Map
                                Map={this.state.map}
                                setMap={this.setMap.bind(this)}
                                StartAddress={this.state.start_address}
                                GoalAddress={this.state.goal_address}
                                setStartAddress={this.setStartAddress.bind(this)}
                                setGoalAddress={this.setGoalAddress.bind(this)}
                                RouteExist={this.state.route_exist}
                                setRouteExist={this.setRouteExist.bind(this)}
                                directionsRenderer={this.state.directionsRenderer}
                                setDirectionsRenderer={this.setDirectionsRenderer.bind(this)}
                            />
                            <div className="side-by-side">
                                <NavigationSaveButton
                                    App_UserId={this.props.App_UserId}
                                    StartAddress={this.state.start_address}
                                    GoalAddress={this.state.goal_address}
                                    setStartAddress={this.setStartAddress.bind(this)}
                                    setGoalAddress={this.setGoalAddress.bind(this)}
                                    reloadMyNavigation={this.reloadMyNavigation.bind(this)}
                                />
                                <BackButtons
                                    setStartAddress={this.setStartAddress.bind(this)}
                                    setGoalAddress={this.setGoalAddress.bind(this)}
                                    setRestaurants={this.setRestaurants.bind(this)}
                                />
                            </div>
                        </div>
                        <ArroundRestaurant
                            Map={this.state.map}
                            RouteExist={this.state.route_exist}
                            StartAddress={this.state.start_address}
                            GoalAddress={this.state.goal_address}
                            Restaurants={this.state.restaurants}
                            setRestaurants={this.setRestaurants.bind(this)}
                        />
                    </div>
                    <div className="navi-side-by-side">
                        <MyNavigation
                            ref={this.reloadRef}
                            App_UserId={this.props.App_UserId}
                            setStartAddress={this.setStartAddress.bind(this)}
                            setGoalAddress={this.setGoalAddress.bind(this)}
                            setRouteExist={this.setRouteExist.bind(this)}
                            setRestaurants={this.setRestaurants.bind(this)}
                            directionsRenderer={this.state.directionsRenderer}
                            setDirectionsRenderer={this.setDirectionsRenderer.bind(this)}
                            Map={this.state.map}
                        />
                        <OtherNavigation
                            App_UserId={this.props.App_UserId}
                            setStartAddress={this.setStartAddress.bind(this)}
                            setGoalAddress={this.setGoalAddress.bind(this)}
                            setRouteExist={this.setRouteExist.bind(this)}
                            setRestaurants={this.setRestaurants.bind(this)}
                            directionsRenderer={this.state.directionsRenderer}
                            setDirectionsRenderer={this.setDirectionsRenderer.bind(this)}
                            Map={this.state.map}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;