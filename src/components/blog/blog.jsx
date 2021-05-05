import React from "react";
import Swiper from "react-id-swiper";

import {db} from "../../config/firebase"



// SCSS
import "./blog.scss";
import "swiper/swiper.scss";


// Components
import Title from "../ui-components/title/title";
import BlogBox from "./blogBox";

class Blog extends React.Component {
  state = {
    prod: [],
  };

componentDidMount() {
  db.collection('products')
  .get()
  .then(snapshot =>{
     const prod = []
     snapshot.forEach(doc =>{
       const data = doc.data()
       prod.push(data)
     })
     this.setState({...prod,prod: prod })
  })

}

  render() {
    // BLOG STORIES RENDER
    let storiesRender = null;
    if (this.state.prod) {
      storiesRender = this.state.prod.map((prod) => (
        <div key={prod.id}>
          <BlogBox article={prod} />
        </div>
      ));
    }
    // SLIDER DE PRODUCTOS
    const params = {
      grabCursor: true,
      slidesPerView: 3,
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
