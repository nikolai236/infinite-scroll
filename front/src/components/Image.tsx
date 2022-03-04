import React, { useState } from "react";

export default function Image(props) {
    const [loading, setLoading] = useState<boolean>(true);
    const url = `http://localhost:5000/file/${props.id}`;

    return (
        <>
            <a href={url} style ={{ position: 'relative' }}> 
                <img
                    className='img-fluid rounded mx-auto d-block'
                    ref={props.forwardRef}
                    src={url}
                    alt={props.id}
                    width='800'
                    height='600'
                    onLoad={() => setLoading(false)}
                    style={{ 
                        opacity: loading ? 0 : 1, 
                        padding: '1%'
                    }}
                ></img>
            </a>
        </>
    );
}