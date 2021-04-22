import Start from '../map_Icons/start.png'
import End from '../map_Icons/goal_tape.png'

export const CreateMarker = (map, address, lat, lng, isStart) => {
    var icon = Start;
    if (!isStart) {
        icon = End;
    }
    var marker = new window.google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: address,
        icon: {
            url: icon,
            scaledSize: new window.google.maps.Size(40, 40)
        },
        optimized: false,
        animation: window.google.maps.Animation.DROP
    });
    return marker;
}

export const DeleteMarker = (marker) => {
    if (marker !== null) {
        marker.setMap(null);
    }
    return null;
}

export const CreateRestaurantMarker = (map, position, restaurant_marker) => {
    if (restaurant_marker) {
        restaurant_marker.setMap(null);
    }
    restaurant_marker = new window.google.maps.Marker({
        position: position,
        map: map,
        animation: window.google.maps.Animation.DROP
    });
    return restaurant_marker;
}