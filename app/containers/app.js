import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { Map, Marker, TileLayer } from 'react-leaflet';
import map from "lodash/map";
import VehicleSocket from "./VehicleSocket";

import { divIcon, point } from "leaflet";

import AppCss from "./app.css";

/*
const position = [
  45.5200,
  -122.6716007,
];
*/
const position = [
  25.0449078,
  121.5481615,
];

const cover = {position: 'absolute', left: 0, right: 0, top: 0, bottom: 0};

class App extends Component {
  render() {
    const { vehicles } = this.props;

    return (
      <VehicleSocket>
        <div style={cover}>
          <Map center={position} zoom={14} style={cover}>
            <TileLayer
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {
              map(vehicles, (vehicle) => {
                //const { routeNumber, type } = vehicle;
                const { RouteName, Type, Color } = vehicle;
                let classes = {
                  [AppCss.marker]: true
                }
                if (Type == 'rail') {
                  classes[AppCss[`rail${RouteName}`]] = true;
                } else if (Type == 'bus') {
                  switch (Color) {
                    case '#800000':
                      classes[AppCss.bus800000] = true;
                      break;
                    case '#FF0000':
                      classes[AppCss.busFF0000] = true;
                      break;
                    case '#FFA500':
                      classes[AppCss.busFFA500] = true;
                      break;
                    case '#FFFF00':
                      classes[AppCss.busFFFF00] = true;
                      break;
                    case '#808000':
                      classes[AppCss.bus808000] = true;
                      break;
                    case '#008000':
                      classes[AppCss.bus008000] = true;
                      break;
                    case '#800080':
                      classes[AppCss.bus800080] = true;
                      break;
                    case '#FF00FF':
                      classes[AppCss.busFF00FF] = true;
                      break;
                    case '#00FF00':
                      classes[AppCss.bus00FF00] = true;
                      break;
                    case '#008080':
                      classes[AppCss.bus008080] = true;
                      break;
                    case '#00FFFF':
                      classes[AppCss.bus00FFFF] = true;
                      break;
                    case '#0000FF':
                      classes[AppCss.bus0000FF] = true;
                      break;
                    case '#000000':
                      classes[AppCss.bus000000] = true;
                      break;
                    case '#C0C0C0':
                      classes[AppCss.busC0C0C0] = true;
                      break;
                    default:
                      classes[AppCss.bus] = true;                
                  }
                }
                var myId = vehicle.RouteName; // + ' ' + vehicle.BusID;
                //const icon = divIcon({ className: classnames(classes), html: `<span>${routeNumber}</span>`});
                const icon = divIcon({ className: classnames(classes), html: `<span>${myId}</span>`});
                return (
                  //<Marker icon={icon} key={vehicle.vehicleID} position={[vehicle.latitude, vehicle.longitude]}/>
                  <Marker icon={icon} key={vehicle.BusID} position={[vehicle.Latitude, vehicle.Longitude]}/>
                )
              })
            }

          </Map>
        </div>
      </VehicleSocket>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      vehicles: state.vehicles
    }
}
export default connect(mapStateToProps)(App)
