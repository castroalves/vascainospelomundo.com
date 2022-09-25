import { useEffect, useState } from 'react';
import L from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import styles from '../Map/Map.module.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const { MapContainer, MapConsumer } = ReactLeaflet;

const LocationMarker = ({ handleLocation }) => {
  const [position, setPosition] = useState(null);
  const map = ReactLeaflet.useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      handleLocation({
        latitude: lat,
        longitude: lng
      });
    }
  });
  return position === null ? null : (
    <ReactLeaflet.Marker position={position} />
  );
}

const AddMemberMap = ({ children, className, handleLocation, ...rest }) => {
  let mapClassName = styles.map;

  if ( className ) {
    mapClassName = `${mapClassName} ${className}`;
  }

  useEffect(() => {
    (async function init() {
      delete L.Icon.Default.prototype._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: iconRetinaUrl.src,
        iconUrl: iconUrl.src,
        shadowUrl: shadowUrl.src,
      });
    })();
  }, []);

  return (
    <MapContainer className={mapClassName} {...rest}>
      <MapConsumer>
        {(map) => children(ReactLeaflet, map)}
      </MapConsumer>
      <LocationMarker handleLocation={handleLocation} />
    </MapContainer>
  )
}

export default AddMemberMap;