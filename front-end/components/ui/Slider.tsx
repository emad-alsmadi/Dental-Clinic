'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import image2 from '../../public/images/dental-clinic2.png';
import image3 from '../../public/images/dental-clinic3.png';
import image4 from '../../public/images/dental-clinic4.png';
import image5 from '../../public/images/dental-clinic5.png';
import image6 from '../../public/images/dental-clinic6.png';

const images = [
    image2,
    image3,
    image4,
    image5,
    image6,
];

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full  overflow-hidden" style={{ height: "530px" }}>
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000
                        ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <Image src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
    );
}

export default Slider;
