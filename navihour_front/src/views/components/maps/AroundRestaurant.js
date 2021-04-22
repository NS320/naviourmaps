import { Component } from 'react';
import "../../../App.css";
import { CreateRestaurantMarker } from './map_functions/Marker'
import Button from '@material-ui/core/Button';
import AroundRamen from '../../icon/AroundRamen.gif'
import Ramen from '../../icon/ramen.png'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
            radius: 1000,//半径〇〇メートル
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
        return (
            <div>
                <img src={AroundRamen} width="80%" height="auto"/>
                <TableContainer className='ramen-list'>
                    <Table>
                        <TableHead>
                            <TableRow style={{ backgroundColor: "#004d40" }}>
                                <TableCell style={{ color: "yellow" }} >Details</TableCell>
                                <TableCell style={{ color: "yellow" }} >Ramen</TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                </TableContainer>
                <TableContainer className='ramen-list'>
                    <Table>
                        <TableBody >
                            {this.props.Restaurants.length ? this.props.Restaurants.map( (item) => (
                                <TableRow hover>
                                    <TableCell>
                                        <Button onClick={() => this.setRestaurantPosition(item.geometry.location)}><img src={Ramen} width="30px" height="30px"/></Button>
                                    </TableCell>
                                    <TableCell>
                                        {item.name}
                                    </TableCell>
                                </TableRow>
                            )): ''}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
export default ArroundRestaurant;
