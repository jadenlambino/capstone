import React from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
import { NavLink } from 'react-router-dom';
import './SplashPage.css'

const SplashPage = () => {
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4,
          slidesToSlide: 4
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          slidesToSlide: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1
        }
      };
    return (
        <div className="splash-div">
            <h1 className='splash'>WELCOME TO JAILED</h1>
            <h2 className='splash'>DEALS SO GOOD THEY'RE CRIMINAL</h2>
            <div className='carousel-container'>
                <h3>Shop by Category</h3>
                <Carousel
                    responsive={responsive}
                    className='carousel'
                    // showDots={true}
                >
                    <NavLink to={'categories/jackets/'}>
                      <div className='c-jacket'></div>
                      <h3 className='c-label'>Jackets</h3>
                    </NavLink>
                    <NavLink to={'categories/shirts/'}>
                      <div className='c-shirt'></div>
                      <h3 className='c-label'>Shirts</h3>
                    </NavLink>
                    <NavLink to={'categories/tshirts/'}>
                      <div className='c-tshirt'></div>
                      <h3 className='c-label'>T-Shirts</h3>
                    </NavLink>
                    <NavLink to={'categories/sweatshirts/'}>
                      <div className='c-sweatshirt'></div>
                      <h3 className='c-label'>Sweatshirts</h3>
                    </NavLink>
                    <NavLink to={'categories/hoodies/'}>
                      <div className='c-hoodie'></div>
                      <h3 className='c-label'>Hoodies</h3>
                    </NavLink>
                    <NavLink to={'categories/jeans/'}>
                      <div className='c-jeans'></div>
                      <h3 className='c-label'>Jeans</h3>
                    </NavLink>
                    <NavLink to={'categories/pants/'}>
                      <div className='c-pants'></div>
                      <h3 className='c-label'>Pants</h3>
                    </NavLink>
                    <NavLink to={'categories/shorts/'}>
                      <div className='c-shorts'></div>
                      <h3 className='c-label'>Shorts</h3>
                    </NavLink>
                    <NavLink to={'categories/shoes/'}>
                      <div className='c-shoes'></div>
                      <h3 className='c-label'>Shoes</h3>
                    </NavLink>
                    <NavLink to={'categories/hats/'}>
                      <div className='c-hats'></div>
                      <h3 className='c-label'>Hats</h3>
                    </NavLink>
                    <NavLink to={'categories/accessories/'}>
                      <div className='c-accessories'></div>
                      <h3 className='c-label'>Accessories</h3>
                    </NavLink>
                </Carousel>
            </div>
            <div className='description'>
            </div>
        </div>
    )
}

export default SplashPage
