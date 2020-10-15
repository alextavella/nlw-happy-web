import Leaflet from "leaflet";
import React from "react";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import mapMarkerImg from "../../images/map-marker.svg";
import { Container, FloatLink, Footer, Header, MapContainer } from "./styles";
import { Link } from "react-router-dom";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const OrphanagesMap: React.FC = () => {
  return (
    <Container>
      <aside>
        <Header>
          <img src={mapMarkerImg} alt="Happy"></img>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </Header>

        <Footer>
          <strong>São Bernardo do Campo</strong>
          <span>São Paulo</span>
        </Footer>
      </aside>

      <MapContainer>
        <Map center={[-23.6096508, -46.5644216]} zoom={15} style={mapStyles}>
          {/* using Openstreetmap */}
          {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

          {/* using MapBox */}
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />

          <Marker icon={mapIcon} position={[-23.6096508, -46.5644216]}>
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              Lar das meninas
              <Link to="/orphanages/1">
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        </Map>
      </MapContainer>

      <FloatLink to="/orphanages/create">
        <FiPlus size={32} color="#fff" />
      </FloatLink>
    </Container>
  );
};

export default OrphanagesMap;
