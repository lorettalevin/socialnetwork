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
                <p className="headline">Welcome to your profile, {first} {last}!</p>
                <div id="profile-container">
                    <div id="profile-left-container">
                        <ProfilePic
                            first={first}
                            last={last}
                            url={url}
                            toggleUploader={toggleUploader}
                        />
                        { showUploader && <ProfilePicUpload
                            setImage={setImage}
                        /> }
                        <p className="profile-pic-uploader">Click to upload a new Profile Picture!</p>
                    </div>
                    <div id="profile-right-container">
                        { showBio && <BioUpload
                            setBio={setBio}
                        /> }
                        <p className="profile-pic-uploader tell-more" onClick={toggleBio}>
                            {bio || "Click to tell us more about yourself!"}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
