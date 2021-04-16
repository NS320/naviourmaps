import React, { Component, createRef } from 'react'
import googleApiJson from '../../../googleAPI.json';

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.map = null;
        this.directionsRenderer = null;
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

    componentDidUpdate() {
        if(!this.props.StartAddress["address"]){//StartAddressのaddressがnullの場合ルートを消す処理
            this.directionsRenderer.setMap(null);
            this.directionsRenderer = null;
        }
    }

    createGoogleMap = () => {
        this.map = new window.google.maps.Map(this.googleMapRef.current, {
            zoom: 14,
            center: {
                lat: 35.68518697509635,
                lng: 139.75278854370117,
            },
            streetViewControl: false,
        })

        this.map.addListener('click', function(e){
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
              this.setAddress(address, latlng);
            }
          } else {
            // Todo 取得失敗時の仕様検討
            alert("住所取得に失敗:" + results);
          }
          
        }.bind(this));
    }

    setAddress = (address, latlng) => {
        if(!this.props.StartAddress["address"]){
            this.props.setStartAddress({address: address, lat: latlng.lat(), lng: latlng.lng()});
        }
        else if(!this.props.GoalAddress["address"]){
            this.props.setGoalAddress({address: address, lat: latlng.lat(), lng: latlng.lng()});
            this.createRoute();
        }
        else{
            // Todo 仮置きのメッセージ
            alert("3点以上の設定はできません。");
        }
    }

    createRoute = () => {
        var startLatLng = new window.google.maps.LatLng(this.props.StartAddress["lat"], this.props.StartAddress["lng"]);
        var goalLatLng = new window.google.maps.LatLng(this.props.GoalAddress["lat"], this.props.GoalAddress["lng"]);
        var directionsService = new window.google.maps.DirectionsService();
        this.directionsRenderer = new window.google.maps.DirectionsRenderer();
    
        var request = {
            origin: startLatLng, //スタート地点
            destination: goalLatLng, //ゴール地点
            travelMode: window.google.maps.DirectionsTravelMode.BICYCLING, //移動手段
        };
        directionsService.route(request, function(result, status) {
            if (status == window.google.maps.DirectionsStatus.OK) {
                this.directionsRenderer.setOptions({
                    preserveViewport: true //ズーム率を変更してルート全体を表示しない
                });
                // ルート検索の結果を地図上に描画
                this.directionsRenderer.setDirections(result);
                this.directionsRenderer.setMap(this.map);
            } else {
                alert("ルートを取得できませんでした:" + status);
            }
        }.bind(this));
    }

    render() {
        return (
            <div className="parent">
                <div className="map"
                    id="google-map"
                    ref={this.googleMapRef}
                    style={{ width: '800px', height: '500px' }}
                />
                <div className="map_state">
                    選択1：{this.props.StartAddress["address"]} <br/>
                    緯度：{this.props.StartAddress["lat"]} <br/>
                    経度：{this.props.StartAddress["lng"]} <br/>
                    <br/>
                    選択2：{this.props.GoalAddress["address"]} <br/>
                    緯度：{this.props.GoalAddress["lat"]} <br/>
                    経度：{this.props.GoalAddress["lng"]} <br/>
                </div>
            </div>
        )
    }
}

export default Map;