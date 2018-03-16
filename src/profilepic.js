import React from 'react';

export default function ProfilePic(props) {
    return (
        <img
            onClick={props.toggleUploader}
            src={ props.url }
            alt={`${props.first} ${props.last}`}
        />
    )
}
