import React from 'react'
import { assets } from '../assets/assets'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
const Hero = () => {
  const carouselItems=[
    {
      image: assets.hero_img,
      title: "Summer Collection",
      description: "Latest Arrivals"
    },
    {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050",
      title: "Winter Collection",
      description: "New Arrivals" 
    },
    {
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93",
      title: "Autumn Style",
      description: "Special Edition"
    }
  ];
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className="h-[500px] w-full">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        className="w-full h-full"
      >
        {carouselItems.map((item, index) => (
          <div key={index} className='relative w-full h-full'>
            <img 
              src={item.image} 
              className='w-full h-full object-cover'
              alt={item.title} 
            />
            <div className='absolute top-1/2 left-16 transform -translate-y-1/2 text-[#414141] bg-white/80 p-8 rounded-lg'>
              <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base'>{item.title}</p>
              </div>
              <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>{item.description}</h1>
              <div className='flex items-center gap-2'>
                <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero