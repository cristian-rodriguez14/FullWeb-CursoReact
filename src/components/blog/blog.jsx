import React from "react";
import Swiper from "react-id-swiper";
// SCSS
import "./blog.scss";
import "swiper/css/swiper.css";
// Assets
import Preview01 from "../../assets/blog/story01/preview.png";
import Preview02 from "../../assets/blog/story02/preview.png";
import Preview03 from "../../assets/blog/story03/preview.png";
import Preview04 from "../../assets/blog/story04/preview.png";
import Preview05 from "../../assets/blog/story05/preview.png";
import Preview06 from "../../assets/blog/story06/preview.png";
// Components
import Title from "../ui-components/title/title";
import BlogBox from "./blogBox";

class Blog extends React.Component {
  state = {
    // LIST ARRAY DE PRODUCTOS
    stories: [
      {
        image: Preview01,
        id: "1",
        title: "NOBRE O TITULO DEL PRODUCTO 1!",
        description: "Las descripciones de los productos son los contenidos del ecommerce que informan",
        date: "PRECIO DEL PRODUCTO 1",
      },
      {
        image: Preview02,
        id: "2",
        title: "NOBRE O TITULO DEL PRODUCTO 2!",
        description: "Las descripciones de los productos son los contenidos del ecommerce que informan",
        date: "PRECIO DEL PRODUCTO 2",
      },
      {
        image: Preview03,
        id: "3",
        title: "NOBRE O TITULO DEL PRODUCTO 3!",
        description: "Las descripciones de los productos son los contenidos del ecommerce que informan",
        date: "PRECIO DEL PRODUCTO 3",
      },
      {
        image: Preview04,
        id: "4",
        title: "NOBRE O TITULO DEL PRODUCTO 4!",
        description: "Las descripciones de los productos son los contenidos del ecommerce que informan",
        date: "PRECIO DEL PRODUCTO 4",
      },
      {
        image: Preview05,
        id: "5",
        title: "NOBRE O TITULO DEL PRODUCTO 5!",
        description: "Las descripciones de los productos son los contenidos del ecommerce que informan",
        date: "PRECIO DEL PRODUCTO 5",
      },
      {
        image: Preview06,
        id: "6",
        title: "NOBRE O TITULO DEL PRODUCTO 6!",
        description: "Las descripciones de los productos son los contenidos del ecommerce que informan",
        date: "PRECIO DEL PRODUCTO  6",
      },
    ],
  };

  render() {
    // BLOG STORIES RENDER
    let storiesRender = null;
    if (this.state.stories) {
      storiesRender = this.state.stories.map((story) => (
        <div key={story.id}>
          <BlogBox article={story} />
        </div>
      ));
    }
    // SLIDER DE PRODUCTOS
    const params = {
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      breakpoints: {
        1200: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      },
    };

    return (
      <div className="blog" id="blog">
        <div className="wrapper">
          <Title title="NUESTOS PRODUCTOS" />
          <p className="font20">
            Disfrute de nuestra amplia variedad en productos y servicios que tenemos para ustedes.<br></br>
            tenemos los mejores precios y atan solo un click de distancia
          </p>
          <div className="padding30">
            <Swiper {...params}>{storiesRender}</Swiper>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
