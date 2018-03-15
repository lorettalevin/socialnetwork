import React from 'react';

export default function Profilepic(props) {
    return (
        <img onClick={props.toggleUploader} src={ props.url } alt="{`${props.first} ${props.last}`}"/>
    )
}
