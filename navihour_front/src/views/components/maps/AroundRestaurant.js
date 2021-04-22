import { Component } from 'react';
import "../../../App.css";
import { CreateRestaurantMarker } from './map_functions/Marker'


class ArroundRestaurant extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.restaurant_marker = null;
        this.placeService = null;
    }

    componentDidUpdate() {
        if ((this.props.RouteExist) && !this.placeService) {
            //ルートの中間地点
            const lat = (this.props.StartAddress["lat"] + this.props.GoalAddress["lat"]) / 2;
            const lng = (this.props.StartAddress["lng"] + this.props.GoalAddress["lng"]) / 2;
            this.arroundRestaurants(this.props.Map, lat, lng);
        }
        if ((!this.props.RouteExist) && (this.placeService)) {
            this.placeService = null;
            if (this.restaurant_marker) {
                this.restaurant_marker.setMap(null);
            }
        }
    }

    arroundRestaurants = (map, lat, lng) => {
        //PlacesServicesのインスタンスの生成
        this.placeService = new window.google.maps.places.PlacesService(map);
        var request = {
            location: { lat: lat, lng: lng },//中心地点
            radius: '1000',//半径〇〇メートル
            query: 'ラーメン'
        };

        this.placeService.textSearch(request, function (result, status) {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                this.props.setRestaurants(result);
                console.log(this.props.Restaurants);
            }
        }.bind(this));
    }

    setRestaurantPosition = (position) => {
        this.restaurant_marker = CreateRestaurantMarker(this.props.Map, position, this.restaurant_marker);
    }

    render() {
        //const list = this.props.Restaurants.map(item => item.name);
        return (
            <div>
                {this.props.Restaurants.length && (
                    this.props.Restaurants.map(item =>
                        <li className="ramen-list">
                            <button
                                onClick={() => this.setRestaurantPosition(item.geometry.location)}
                            >[ラーメン屋表示ボタン]</button> {item.name}
                        </li>
                    )
                )}
            </div>
        )
    }
}
export default ArroundRestaurant;
