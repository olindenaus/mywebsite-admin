import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule
} from 'react-simple-maps';

import './WorldMapView.scss';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const visitedCountries = ['POL', 'ARE', 'CHN', 'DEU', 'CHE', 'ITA', 'FRA', 'ESP',
  'PRT', 'ISL', 'FIN', 'DNK', 'SWE', 'HRV', 'TUR', 'GRC',
  'ISR', 'CZE', 'SVK', 'SVN', 'AUT'];

const worldMapView = (props: any) => {

  const getStyleForVisitedCountry = (geo: any) => {
    const v = visitedCountries.find(c => c === geo.properties.ISO_A3);
    return v ? { default: { fill: "gray", stroke: "#000" } } : { default: { fill: '66ff66', stroke: "#000" } };
  }

  return (
    <div className="map-view">
      <p>Currently in... [city, country, cordinates]</p>
      <ComposableMap width={1920} height={1080} projectionConfig={{ scale: 315 }}>
        <Graticule stroke="#ff5533" Globe={true} />
        <Geographies geography={geoUrl}>
          {({ geographies }: any) => geographies.map((geo: any) => {
            const style = getStyleForVisitedCountry(geo);
            return <Geography key={geo.rsmKey} geography={geo} style={style} />
          })}
        </Geographies>
      </ComposableMap>
    </div>
  )
};
export default worldMapView;