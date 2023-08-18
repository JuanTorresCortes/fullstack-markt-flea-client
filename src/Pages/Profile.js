// import React, { useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import { getUserInfo, deleteProfile } from "../Api/api";
// import { Card, ListGroup, Modal, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { removeUserToken } from "../Auth/authLocalStorage";

// const Profile = () => {
//   const [data, setData] = useState({});
//   const [showModal, setShowModal] = useState(true);
//   const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
//   const { userInfo, userToken, setUser, setIsVerified } = useOutletContext();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getData = async () => {
//       const response = await getUserInfo(userToken, userInfo._id);
//       if (response.success) {
//         setData(response.user);
//       }
//     };

//     if (userInfo._id) {
//       getData();
//     }
//   }, [userToken, userInfo._id]);

//   const handleClose = () => {
//     setShowModal(false);
//     navigate("/");
//   };

//   const handleDeleteProfile = async () => {
//     setShowDeleteConfirmModal(true);
//   };

//   const handleConfirmDelete = async () => {
//     setShowDeleteConfirmModal(false);
//     try {
//       const response = await deleteProfile(userToken, userInfo._id);
//       if (response.success) {
//         alert("Profile deleted successfully.");
//         removeUserToken();
//         setUser(null);
//         setIsVerified(false);
//         navigate("/");
//       } else {
//         alert("Failed to delete profile.");
//       }
//     } catch (error) {
//       console.error("Failed to delete profile:", error);
//       alert("Failed to delete profile.");
//     }
//   };

//   return (
//     <div>
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{`${data.firstName} ${data.lastName}`}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Card>
//             <Card.Header>
//               <h2>{`${data.firstName} ${data.lastName}`}</h2>
//             </Card.Header>
//             <ListGroup variant="flush">
//               <ListGroup.Item>
//                 <strong>Email:</strong> {data.email}
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <strong>Billing Address:</strong> {data.billingAddress}
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <strong>Birthday:</strong>{" "}
//                 {new Date(data.birthday).toLocaleDateString()}
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <strong>Created At:</strong>{" "}
//                 {new Date(data.createdAt).toLocaleDateString()}
//               </ListGroup.Item>
//             </ListGroup>
//           </Card>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="danger" onClick={handleDeleteProfile}>
//             Delete Profile
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal
//         show={showDeleteConfirmModal}
//         onHide={() => setShowDeleteConfirmModal(false)}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete your profile?</Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="secondary"
//             onClick={() => setShowDeleteConfirmModal(false)}
//           >
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleConfirmDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Profile;

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

  useEffect(() => {
    const getData = async () => {
      const response = await getUserInfo(userToken, userInfo._id);
      if (response.success) {
        setData(response.user);
      }
    };

    if (userInfo._id) {
      getData();
    }
  }, [userToken, userInfo._id]);

  const handleClose = () => {
    setShowModal(false);
    navigate("/");
  };

  //   const handleDeleteProfile = async () => {
  //     setShowConfirmModal(false);

  //     // Log out the user
  //     const resultLogout = await removeUserToken();
  //     if (resultLogout) {
  //       setUser(null);
  //       setIsVerified(false);

  //       // Delete the profile from the server
  //       try {
  //         const response = await deleteProfile(userToken, userInfo._id);
  //         if (response.success) {
  //           alert("Profile deleted successfully.");
  //         } else {
  //           alert("Failed to delete profile.");
  //         }
  //       } catch (error) {
  //         console.error("Failed to delete profile:", error);
  //         alert("Failed to delete profile.");
  //       }

  //       // Redirect the user to the home page
  //       navigate("/");
  //     }
  //   };

  const handleDeleteProfile = async () => {
    setShowConfirmModal(false);

    // Log out the user
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
