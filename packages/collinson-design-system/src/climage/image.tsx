import Image from 'next/image';

interface ImageProps {
    src: string;
    alt: string;
}

const CLImage = ({src, alt}:ImageProps) => {
    
    return (
        <Image
            src={src}
            alt={alt}
            width={300}
            height={300}
        />
    );
}

export default CLImage; 