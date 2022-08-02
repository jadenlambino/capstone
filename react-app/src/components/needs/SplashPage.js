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
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
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
                >
                    <NavLink to={'listings/jackets/'}>
                      <div className='c-jacket'></div>
                    </NavLink>
                    <NavLink to={'listings/shirts/'}>
                      <div className='c-shirt'></div>
                    </NavLink>
                    <NavLink to={'listings/tshirts/'}>
                      <div className='c-tshirt'></div>
                    </NavLink>
                    <NavLink to={'listings/sweatshirts/'}>
                      <div className='c-sweatshirt'></div>
                    </NavLink>
                    <NavLink to={'listings/hoodies/'}>
                      <div className='c-hoodie'></div>
                    </NavLink>
                    <NavLink to={'listings/jeans/'}>
                      <div className='c-jeans'></div>
                    </NavLink>
                    <NavLink to={'listings/pants/'}>
                      <div className='c-pants'></div>
                    </NavLink>
                    <NavLink to={'listings/shorts/'}>
                      <div className='c-shorts'></div>
                    </NavLink>
                    <NavLink to={'listings/shoes/'}>
                      <div className='c-shoes'></div>
                    </NavLink>
                    <NavLink to={'listings/hats/'}>
                      <div className='c-hats'></div>
                    </NavLink>
                    <NavLink to={'listings/accessories/'}>
                      <div className='c-accessories'></div>
                    </NavLink>
                </Carousel>
            </div>
            <div className='description'>

            </div>
        </div>
    )
}

export default SplashPage
