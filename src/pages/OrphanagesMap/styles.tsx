import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;

  > aside {
    background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);
    padding: 80px;
    width: 440px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const Header = styled.header`
  > h2 {
    font-size: 40px;
    font-weight: 800;
    line-height: 42px;
    margin-top: 64px;
  }

  > p {
    line-height: 28px;
    margin-top: 24px;
  }
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;

  line-height: 24px;

  > strong {
    font-weight: 800;
  }
`;

export const MapContainer = styled.div`
  flex: 1;

  .leaflet-container {
    z-index: 5;
  }
`;

export const FloatLink = styled(Link)`
  position: absolute;
  right: 40px;
  bottom: 40px;
  z-index: 10;

  width: 64px;
  height: 64px;
  background: #15c3d6;
  border-radius: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  &:hover {
    background: #17d6eb;
  }
`;
