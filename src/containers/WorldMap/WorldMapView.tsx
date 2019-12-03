import React, { useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule
} from 'react-simple-maps';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import './WorldMapView.scss';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const visitedCountries = ['POL', 'ARE', 'CHN', 'DEU', 'CHE', 'ITA', 'FRA', 'ESP',
  'PRT', 'ISL', 'FIN', 'DNK', 'SWE', 'HRV', 'TUR', 'GRC',
  'ISR', 'CZE', 'SVK', 'SVN', 'AUT'];

export const WorldMapView = (props: any) => {

  useEffect(() => {
    props.onFetchCountryInfo();
  }, []);

  const getStyleForVisitedCountry = (geo: any) => {
    const v = visitedCountries.find(c => c === geo.properties.ISO_A3);
    return v ? { default: { fill: "gray", stroke: "#000" } } : { default: { fill: '66ff66', stroke: "#000" } };
  }

  let currentlyIn = <p>Currently in... {props.country}</p>;

  if (props.loading) {
    currentlyIn = <Spinner />
  }

  let errorMessage = null;
  if (props.error !== '') {
    errorMessage = <p>{props.error}</p>
  }


  return (
    <div className="map-view">
      <div className="info-panel">
        {currentlyIn}
        {errorMessage}
        <NavLink to="/logs"><div>See locations' history</div></NavLink>
      </div>
      <ComposableMap width={1920} height={1080} style={{width: "100%", height: "100%"}} projectionConfig={{scale: 360}}>
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

const mapStateToProps = (state: any) => {
  return {
    country: state.logs.country,
    loading: state.logs.loading,
    error: state.logs.errorMessage
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchCountryInfo: () => dispatch(actions.fetchCountryInfo())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WorldMapView);