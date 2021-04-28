import React, { Component } from 'react';
import googleApiJson from '../../../googleAPI.json';
import { CreateRoute } from './map_functions/CreateRoute'
import { CreateMarker, DeleteMarker } from './map_functions/Marker'

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.start_marker = null;
        this.goal_marker = null;
    }

    googleMapRef = React.createRef()

    componentDidMount() {
        const googleMapScript = document.createElement('script')

        const json = googleApiJson;
        const key = json["googleAPI"];
        googleMapScript.src = "https://maps.googleapis.com/maps/api/js?key=" + key + " &libraries=places,geometry"

        window.document.body.appendChild(googleMapScript)

        googleMapScript.addEventListener('load', () => {
            this.googleMap = this.createGoogleMap()
        })
    }

    componentDidUpdate() {
        // ピンの削除
        if ((!this.props.StartAddress["address"]) && this.start_marker) {
            this.start_marker = DeleteMarker(this.start_marker);
        }
        if ((!this.props.GoalAddress["address"]) && this.goal_marker) {
            this.goal_marker = DeleteMarker(this.goal_marker);
        }

        //StartAddressのaddressがnull場合ルートを消す処理
        if ((!this.props.StartAddress["address"]) && this.props.RouteExist) {
            this.props.setRouteExist(false);
            this.props.directionsRenderer.setMap(null);
            this.props.setDirectionsRenderer(null);
        }
        //StartAddressとGoalAddressのaddressが存在する場合ルートを引く処理
        if (this.props.StartAddress["address"] && this.props.GoalAddress["address"] && (!this.props.RouteExist)) {
            this.props.setRouteExist(true);
            this.props.setDirectionsRenderer(CreateRoute(this.props.Map, this.props.StartAddress, this.props.GoalAddress));
        }
    }

    setStartAddress = (start_address) => {
        this.setState({ start_address: start_address });
    }

    setGoalAddress = (goal_address) => {
        this.setState({ goal_address: goal_address });
    }

    createGoogleMap = () => {
        this.props.setMap(new window.google.maps.Map(this.googleMapRef.current, {
            zoom: 14,
            center: {
                lat: 35.68518697509635,
                lng: 139.75278854370117,
            },
            streetViewControl: false,
        }))

        const input = document.getElementById("google-map-input");
        const searchBox = new window.google.maps.places.SearchBox(input);
        this.props.Map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);
        this.props.Map.addListener("bounds_changed", () => {
            searchBox.setBounds(this.props.Map.getBounds());
        });
        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            const bounds = new window.google.maps.LatLngBounds();
            places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            this.props.Map.fitBounds(bounds);
        });
        
        this.props.Map.addListener('click', function (e) {
            //map.panTo(e.latLng); // クリックした場所をマップの中心にする。
            this.getAddress(e.latLng);
        }.bind(this));
    }

    getAddress = (latlng) => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({
            latLng: latlng
        }, function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {
                if (results[0].geometry) {
                    const address = results[0].formatted_address.replace(/^日本(、|,)/, '');
                    this.setAddress(address, latlng);
                }
            } else {
                // Todo 取得失敗時の仕様検討
                alert("住所取得に失敗:" + results);
            }

        }.bind(this));
    }

    setAddress = (address, latlng) => {
        var isStart = true;
        if (!this.props.StartAddress["address"]) {
            this.start_marker = CreateMarker(this.props.Map, address, latlng.lat(), latlng.lng(), isStart);
            this.props.setStartAddress({ address: address, lat: latlng.lat(), lng: latlng.lng() });
        }
        else if (!this.props.GoalAddress["address"]) {
            isStart = false;
            this.goal_marker = CreateMarker(this.props.Map, address, latlng.lat(), latlng.lng(), isStart);
            this.props.setGoalAddress({ address: address, lat: latlng.lat(), lng: latlng.lng() });
        }
        else {
            // Todo 仮置きのメッセージ
            alert("3点以上の設定はできません。");
        }
    }

    render() {
        return (
            <div className="parent">
                <input
                    id="google-map-input"
                    className="google-map-input"
                    type="text"
                    placeholder="Search"
                />
                <div 
                    className="map"
                    id="google-map"
                    ref={this.googleMapRef}
                />
            </div>
        )
    }
}

export default Map;