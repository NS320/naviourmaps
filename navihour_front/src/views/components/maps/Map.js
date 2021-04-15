import React, { Component, createRef } from 'react'
import googleApiJson from '../../../googleAPI.json';

class Map extends Component {
    constructor(props) {
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
    
    googleMapRef = React.createRef()

    componentDidMount() {
        const googleMapScript = document.createElement('script')

        var json = googleApiJson;
        var key = json["googleAPI"];
        googleMapScript.src = "https://maps.googleapis.com/maps/api/js?key=" + key + " &libraries=places"
        
        window.document.body.appendChild(googleMapScript)

        googleMapScript.addEventListener('load', () => {
            this.googleMap = this.createGoogleMap()
            this.marker = this.createMarker()
        })
    }

    createGoogleMap = () => {
        var map = new window.google.maps.Map(this.googleMapRef.current, {
            zoom: 16,
            center: {
                lat: 35.68518697509635,
                lng: 139.75278854370117,
            },
            disableDefaultUI: true,
        })

        map.addListener('click', function(e){
            //map.panTo(e.latLng); // クリックした場所をマップの中心にする。
            this.getAddress(e.latLng);
        }.bind(this));
    }

    createMarker = () => {
        new window.google.maps.Marker({
            position: { lat: 35.68518697509635, lng: 139.75278854370117 },
            map: this.googleMap,
        })
    }

    getAddress = (latlng) => {
        var geocoder = new window.google.maps.Geocoder();
 
        geocoder.geocode({
          latLng: latlng
        }, function(results, status) {
          if (status === window.google.maps.GeocoderStatus.OK) {
            if (results[0].geometry) {
              var address = results[0].formatted_address.replace(/^日本(、|,)/, '');
              this.setAddress(address,latlng);
            }
          } else {
            // Todo 取得失敗時の仕様検討
            alert("住所取得に失敗:" + results);
          }
          
        }.bind(this));
    }

    setAddress = (address, latlng) => {
        if(!this.state.start_address["address"]){
            this.setStartSddress({address: address, lat: latlng.lat(), lng: latlng.lng()});
        }
        else if(!this.state.goal_address["address"]){
            this.setGoalAddress({address: address, lat: latlng.lat(), lng: latlng.lng()});
        }
        else{
            // Todo 仮置きのメッセージ
            alert("3点以上の設定はできません。");
        }
    }

    render() {
        return (
            <div className="parent">
                <div className="map"
                    id="google-map"
                    ref={this.googleMapRef}
                    style={{ width: '400px', height: '300px' }}
                />
                <div className="map_state">
                    選択1：{this.state.start_address["address"]} <br/>
                    緯度：{this.state.start_address["lat"]} <br/>
                    経度：{this.state.start_address["lng"]} <br/>
                    <br/>
                    選択2：{this.state.goal_address["address"]} <br/>
                    緯度：{this.state.goal_address["lat"]} <br/>
                    経度：{this.state.goal_address["lng"]} <br/>
                </div>
                {this.props.GoalAddress["address"]}👈別の子供(HomeButton)が変更した値を表示
            </div>
        )
    }
}

export default Map;