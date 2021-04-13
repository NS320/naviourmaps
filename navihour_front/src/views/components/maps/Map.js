import React, { Component, createRef } from 'react'

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address1: {          
                address: "",  
                lat: "",
                lng: ""
            },
            address2: {   
                address: "",           
                lat: "",
                lng: ""
            }
        }
    }

    setAddress1 = (address1) => {
        this.setState({address1: address1});
    }

    setAddress2 = (address2) => {
        this.setState({address2: address2});
    }
    
    googleMapRef = React.createRef()

    componentDidMount() {
        const googleMapScript = document.createElement('script')
        googleMapScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDVsPgF1nvJegQKZIPaq1sYIgiG5KmdBNI&libraries=places"
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
        if(!this.state.address1["address"]){
            this.setAddress1({address: address, lat: latlng.lat(), lng: latlng.lng()});
        }
        else if(!this.state.address2["address"]){
            this.setAddress2({address: address, lat: latlng.lat(), lng: latlng.lng()});
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
                    選択1：{this.state.address1["address"]} <br/>
                    緯度：{this.state.address1["lat"]} <br/>
                    経度：{this.state.address1["lng"]} <br/>
                    <br/>
                    選択2：{this.state.address2["address"]} <br/>
                    緯度：{this.state.address2["lat"]} <br/>
                    経度：{this.state.address2["lng"]} <br/>
                </div>
            </div>
        )
    }
}

export default Map;