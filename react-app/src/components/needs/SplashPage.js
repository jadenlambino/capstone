import React from 'react'
import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
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
                    <div className='c-jacket'></div>
                    <div className='c-shirt'></div>
                    <div className='c-tshirt'></div>
                    <div className='c-sweatshirt'></div>
                    <div className='c-hoodie'></div>
                    <div className='c-jeans'></div>
                    <div className='c-pants'></div>
                    <div className='c-shorts'></div>
                    <div className='c-shoes'></div>
                    <div className='c-hats'></div>
                    <div className='c-accessories'></div>
                </Carousel>
            </div>
            <div className='description'>

            </div>
        </div>
    )
}

export default SplashPage
