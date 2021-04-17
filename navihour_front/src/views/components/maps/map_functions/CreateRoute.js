

const CreateRoute = (directionsRenderer, map, StartAddress, GoalAddress) => {
    var startLatLng = new window.google.maps.LatLng(StartAddress["lat"], StartAddress["lng"]);
    var goalLatLng = new window.google.maps.LatLng(GoalAddress["lat"], GoalAddress["lng"]);
    var directionsService = new window.google.maps.DirectionsService();
    directionsRenderer = new window.google.maps.DirectionsRenderer();

    var request = {
        origin: startLatLng, //スタート地点
        destination: goalLatLng, //ゴール地点
        travelMode: window.google.maps.DirectionsTravelMode.BICYCLING, //移動手段
    };
    directionsService.route(request, function(result, status) {
        if (status == window.google.maps.DirectionsStatus.OK) {
            directionsRenderer.setOptions({
                preserveViewport: true //ズーム率を変更してルート全体を表示しない
            });
            // ルート検索の結果を地図上に描画
            directionsRenderer.setDirections(result);
            directionsRenderer.setMap(map);
        } else {
            alert("ルートを取得できませんでした:" + status);
        }
    }.bind(this));
}

export default CreateRoute;