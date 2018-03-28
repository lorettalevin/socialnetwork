import React from 'react';

export default function ProfilePic(props) {
    return (
        <div className="profile-pic-uploader">
            <img
                onClick={props.toggleUploader}
                src={ props.url }
                alt={`${props.first} ${props.last}`}
            />
        </div>
    )
}
