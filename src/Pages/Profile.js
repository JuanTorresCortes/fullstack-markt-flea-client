import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getUserInfo, deleteProfile } from "../Api/api";
import { Card, ListGroup, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { removeUserToken } from "../Auth/authLocalStorage";

const Profile = () => {
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { userInfo, userToken, setUser, setIsVerified } = useOutletContext();
  const navigate = useNavigate();

  // Effect hook to fetch user data based on token and user ID
  useEffect(() => {
    const getData = async () => {
      const response = await getUserInfo(userToken, userInfo._id);
      if (response.success) {
        setData(response.user); // Set user data to state
      }
    };

    if (userInfo._id) {
      getData();
    }
  }, [userToken, userInfo._id]);

  // Handler to close the main profile modal and navigate to home
  const handleClose = () => {
    setShowModal(false);
    navigate("/");
  };

  // Handler to delete the user profile
  const handleDeleteProfile = async () => {
    setShowConfirmModal(false);

    // Log out the user and remove their token from local storage
    const resultLogout = await removeUserToken();
    if (resultLogout) {
      setUser(null);
      setIsVerified(false);

      // Delete the profile from the server
      try {
        const response = await deleteProfile(userToken, userInfo._id);
        console.log("Response from server:", response); // Log the response
        if (response.success) {
          alert("Profile deleted successfully.");
        } else {
          alert("Failed to delete profile.");
        }
      } catch (error) {
        console.error("Failed to delete profile:", error);
        alert("Failed to delete profile.");
      }

      // Redirect the user to the home page
      navigate("/");
    }
  };

  return (
    // Main profile modal
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <h2>My Profile</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Header>
            <h2>{`${data.firstName} ${data.lastName}`}</h2>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Email:</strong> {data.email}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Billing Address:</strong> {data.billingAddress}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Birthday:</strong>{" "}
              {new Date(data.birthday).toLocaleDateString()}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Created At:</strong>{" "}
              {new Date(data.createdAt).toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={() => setShowConfirmModal(true)}>
          Delete Profile
        </Button>
      </Modal.Footer>
      {/* Confirmation modal to confirm profile deletion */}
      {showConfirmModal && (
        <Modal
          show={showConfirmModal}
          onHide={() => setShowConfirmModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Profile Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete your profile? This action cannot be
            undone.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteProfile}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Modal>
  );
};

export default Profile;
