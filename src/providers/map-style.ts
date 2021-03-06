import {Injectable} from '@angular/core';

/*
 Generated class for the MapStyle provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class MapStyle {

  // See more styles on https://snazzymaps.com/

  static dark() {
    return [{
      "featureType": "all",
      "elementType": "labels",
      "stylers": [{"visibility": "on"}]
    }, {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{"saturation": 36}, {"color": "#000000"}, {"lightness": 40}]
    }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{"visibility": "on"}, {"color": "#000000"}, {"lightness": 16}]
    }, {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [{"visibility": "off"}]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#000000"}, {"lightness": 20}]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]
    }, {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#e5c163"}]
    }, {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#c4c4c4"}]
    }, {
      "featureType": "administrative.neighborhood",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#e5c163"}]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{"color": "#000000"}, {"lightness": 20}]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{"color": "#000000"}, {"lightness": 21}, {"visibility": "on"}]
    }, {
      "featureType": "poi.business",
      "elementType": "geometry",
      "stylers": [{"visibility": "on"}]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#e5c163"}, {"lightness": "0"}]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{"visibility": "off"}]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#ffffff"}]
    }, {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [{"color": "#e5c163"}]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{"color": "#000000"}, {"lightness": 18}]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#575757"}]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#ffffff"}]
    }, {
      "featureType": "road.arterial",
      "elementType": "labels.text.stroke",
      "stylers": [{"color": "#2c2c2c"}]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{"color": "#000000"}, {"lightness": 16}]
    }, {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#999999"}]
    }, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{"color": "#000000"}, {"lightness": 19}]
    }, {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#000000"}, {"lightness": 17}]}];
  }

  static light() {
    return [{
      "featureType": "administrative",
      "elementType": "all",
      "stylers": [{"visibility": "simplified"}]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{"visibility": "simplified"}, {"color": "#fcfcfc"}]
    }, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{"visibility": "simplified"}, {"color": "#fcfcfc"}]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{"visibility": "simplified"}, {"color": "#dddddd"}]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{"visibility": "simplified"}, {"color": "#dddddd"}]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{"visibility": "simplified"}, {"color": "#eeeeee"}]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{"visibility": "simplified"}, {"color": "#dddddd"}]
    }];
  }

  static midnight() {
    return [{
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [{"color": "#ffffff"}, {"weight": "0.20"}, {"lightness": "28"}, {"saturation": "23"}, {"visibility": "off"}]
    }, {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [{"color": "#494949"}, {"lightness": 13}, {"visibility": "off"}]
    }, {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [{"visibility": "off"}]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#000000"}]
    }, {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [{"color": "#144b53"}, {"lightness": 14}, {"weight": 1.4}]
    }, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#08304b"}]}, {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [{"color": "#0c4152"}, {"lightness": 5}]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#000000"}]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [{"color": "#0b434f"}, {"lightness": 25}]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.fill",
      "stylers": [{"color": "#000000"}]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry.stroke",
      "stylers": [{"color": "#0b3d51"}, {"lightness": 16}]
    }, {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [{"color": "#000000"}]
    }, {"featureType": "transit", "elementType": "all", "stylers": [{"color": "#146474"}]}, {
      "featureType": "water",
      "elementType": "all",
      "stylers": [{"color": "#021019"}]
    }];
  }
}