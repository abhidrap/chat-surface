import React, { useEffect, useState, useRef } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Card, Button, Form } from 'react-bootstrap';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, checkAuth } = useAuthStore();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);  

  useEffect(() => {
    if (!authUser) {
      checkAuth();
    }
  }, [authUser, checkAuth]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if(!file)
    {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);


    reader.onload = async () =>{
      const base64Image = reader.result;
      setImagePreview(base64Image);
      await updateProfile( {profilePic: base64Image});
    }
  };

  const handleProfileUpdate = async () => {
    if (image) {
      try {
        await updateProfile({ profileImage: image });
        alert('Profile updated successfully!');
      } catch (error) {
        alert('Failed to update profile. Please try again.');
      }
    }
  };

  if (!authUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-center align-items-center">
          <Card className="mt-5 p-4" style={{ width: '400px' }}>
            <Card.Body>
              <Card.Title className="text-center">Profile</Card.Title>
              <Card.Text className="text-center lead mt-2 mb-3">
                Your Profile Information
              </Card.Text>
              
              {/* Profile Image */}
              <div className="text-center">
                <img
                  src={imagePreview || authUser.profilePic || '/user.svg'}
                  alt="Profile"
                  className="rounded-3 img-fluid mb-3"
                  style={{ 
                    width: '150px', 
                    height: '150px', 
                    objectFit: 'cover',
                    cursor: 'pointer' 
                  }}
                  onClick={handleUploadClick}
                />
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />

              {/* Visible upload button */}
              <Button
                variant="outline-primary"
                onClick={handleUploadClick}
                className="w-100 mb-3"
              >
                Choose Profile Picture
              </Button>

              {/* Account Name (Readonly) */}
              <Form.Group className="mt-3">
                <Form.Label>Account Name</Form.Label>
                <Form.Control
                  type="text"
                  value={authUser.fullname}
                  readOnly
                />
              </Form.Group>

              {/* Account Email (Readonly) */}
              <Form.Group className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={authUser.email}
                  readOnly
                />
              </Form.Group>

              {/* Account Status */}
              <Form.Group className="mt-3 d-flex justify-content-between">
                <Form.Label>Account Status</Form.Label>
                <Form.Text className="badge bg-success">Active</Form.Text>
              </Form.Group>

              {/* Update Button */}
              <Button
                variant="primary"
                onClick={handleProfileUpdate}
                disabled={isUpdatingProfile || !image}
                className="mt-3 w-100"
              >
                {isUpdatingProfile ? 'Updating...' : 'Update Profile'}
              </Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;