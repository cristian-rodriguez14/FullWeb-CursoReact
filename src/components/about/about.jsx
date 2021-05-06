import React from "react";
import { Row, Col } from "react-flexbox-grid";
import "./about.scss";
// Components
import TeamBox from './teamBox';
import TeamInfo from "./teamInfo";
import Title from "../ui-components/title/title";
// Assets
import Person01 from "../../assets/about/person01.png";
import Person02 from "../../assets/about/person02.png";

const about = () => (
  <div id="about">
    <div className="wrapper">
      <Title title="NOSOTROS." />
      <p className="font17">
        Este proyecto fue realizado con el fin de demostrar todas nuestras habilidades adquirida en la libreria React<br></br>
        durante nuestro curso de Frontend dictado por nuestro tutor Michell.
      </p>
      <Row>
        <Col md={12} lg={4}>
          <TeamBox avatar={Person01} name="Cristian Rodriguez" job="Web designer" />
        </Col>
        <Col md={12} lg={4}>
          <TeamBox avatar={Person02} name="Jesus Rodriguez" job="Graphic Designer" />
        </Col>
        <Col md={12} lg={4}>
          <TeamInfo />
        </Col>
      </Row>
    </div>
  </div>
);

export default about;
