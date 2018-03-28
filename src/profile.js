import React from 'react';
import ProfilePic from './profilepic'
import ProfilePicUpload from './profilepicupload'
import BioUpload from './bioupload'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { first, last, url, bio, setBio, toggleBio, showBio, setImage, toggleUploader, showUploader } = this.props
        return (
            <div>
                <p className="welcome-user">Welcome to your profile, {first} {last}!</p>
                <ProfilePic
                    first={first}
                    last={last}
                    url={url}
                    toggleUploader={toggleUploader}
                />
                <p className="profile-pic-uploader">Click to upload a new Profile Picture!</p>
                { showUploader && <ProfilePicUpload
                        setImage={setImage}
                    /> }
                { showBio && <BioUpload
                        setBio={setBio}
                    /> }
                <h1 onClick={toggleBio}>
                    {bio || "Click to tell us more about yourself!"}
                </h1>
            </div>
        )
    }
}
