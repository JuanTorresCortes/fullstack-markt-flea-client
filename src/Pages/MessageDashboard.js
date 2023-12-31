import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Table, Container, Row, Button } from "react-bootstrap";
import { getUserMessages, deleteUserMessage } from "../Api/api";

const MessageDashboard = () => {
  const [messages, setMessages] = useState([]);

  const { userToken, userInfo } = useOutletContext();

  const userId = userInfo._id;

  // Function to fetch user messages from the server
  const fetchMessages = async () => {
    const response = await getUserMessages(userToken);
    if (response.success) {
      setMessages(response.messages);
    } else {
      console.error("Error fetching messages:", response.message);
    }
  };

  // Function to handle deleting a specific user message
  const handleDelete = async (messageId) => {
    try {
      const response = await deleteUserMessage(userToken, userId, messageId);
      if (response.success) {
        // Update the messages state by filtering out the deleted message
        setMessages(messages.filter((message) => message._id !== messageId));
      } else {
        console.error("Error deleting message:", response.message);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  // Effect hook to fetch user messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, [userToken]);

  return (
    // Rendering the dashboard with a table of messages
    <Container style={{ margin: "5rem" }}>
      <h2>Message DashBoard</h2>
      <Row className="mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Message from:</th>
              <th>Message to:</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{message.senderName}</td>
                <td>{message.receiverName}</td>
                <td>{message.content}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(message._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default MessageDashboard;
