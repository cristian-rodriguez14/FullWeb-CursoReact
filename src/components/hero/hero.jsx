import React from "react";
import { Row, Col } from "react-flexbox-grid";
// SCSS
import "./hero.scss";
//Assets
import HeroImage from '../../assets/hero/hero-image.png';
//Components
import Button from '../ui-components/button/button';

const hero = () => (
  <div className="hero" id="hero">
    <div className="wrapper">
      <Row>
        <Col md={12} lg={6}>
          <div className="hero-info">
            <h1 className="weight800 font60">Bienvenidos.!</h1>
            <h1 className="weight800 font40">
              Esta es nuestra pagina web de "Comida"
            </h1>
            <p className="font12">
              En ella encontraran los mejores ingredientes, recetas y comidas para disfrutae en familia y con sus amigos.
            </p>
            <Button label="Contactenos" target={"contact"} />
          </div>
        </Col>
        <Col md={12} lg={6}>
          <div className="hero-image">
            <img src={HeroImage} alt="hero" />
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default hero;
