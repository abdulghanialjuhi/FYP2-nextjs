import Image from 'next/image';
import React, { useState } from 'react'

export default function BarbershopImages({ images }) {
    
    const images1 = [
        '/barber-banner.jpg',
        '/img2.png',
        '/img3.png',
    ]

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === images1.length - 1 ? 0 : prevSlide + 1));
    };
  
    const prevSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide === 0 ? images1.length - 1 : prevSlide - 1));
    };

    return (
        <div className='flex flex-grow rounded-md max-w-[1200px] w-full max-h-[600px] overflow-hidden'>
            <div className="relative flex-grow">
                {images1.map((image, index) => (
                    <Image
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    layout='fill'
                    className={`absolute inset-0 mx-auto ${index === currentSlide ? 'block' : 'hidden'}`}
                    />
                ))}
                <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-l-md"
                    onClick={prevSlide}
                >
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </button>
                <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded-r-md"
                    onClick={nextSlide}
                >
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    )
}
