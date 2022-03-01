import { useRef} from 'react';
import { useIntersectObserver } from '../hooks/useIntersectObserver';
import Image from './Image';

export default function ImageContainer(props) {
    const image = useRef(null);

    useIntersectObserver(
        image,
        ([{ isIntersecting }], observer) => {
            console.log('ll')
            if(isIntersecting) {
                props.onLoad();

                observer.unobserve(image.current);
            }
        }
    )

    return (
        <>   
            <Image id={props.id} forwardRef={image} />
        </>
    )
}