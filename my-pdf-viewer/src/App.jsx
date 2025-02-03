import React, { useState, useEffect } from "react";
import { Button, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [zoomLevel, setZoomLevel] = useState(1); // Default zoom level is 100%
  const [pdfUrl, setPdfUrl] = useState(null);

  // Function to handle zoom in
  const zoomIn = () => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
  };

  // Function to handle zoom out
  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.1)); // Prevent zooming out too much
  };

  // Load the PDF URL when the component mounts
  useEffect(() => {
    if (window.env && window.env.VITE_url) {
      setPdfUrl(`${window.env.VITE_url}/api/view-pdf`);
    }
  }, []);
  

  return (
    <Container className="mt-4">
      <Card className="shadow p-4">
        <h2 className="text-center">Credit Marketing</h2>

        {/* Zoom In/Out Buttons (Vertical alignment on Right Side) */}
        <div
          className="zoom-buttons"
          style={{
            position: "fixed",
            top: "50%", // Vertically center the buttons
            right: "20px", // Position on the right side
            transform: "translateY(-50%)", // Adjust the position for centering vertically
            zIndex: 100,
            display: "flex",
            flexDirection: "column", // Stack buttons vertically
            alignItems: "center", // Center the buttons horizontally
            gap: "10px", // Space between buttons
          }}
        >
          <Button
            variant="secondary"
            onClick={zoomOut}
            style={{
              width: "80px", // Make buttons same width
            }}
          >
            Zoom Out
          </Button>
          <Button
            variant="secondary"
            onClick={zoomIn}
            style={{
              width: "80px", // Make buttons same width
            }}
          >
            Zoom In
          </Button>
        </div>

        {/* Embed the Protected PDF from the server */}
        <div
          style={{
            overflowX: "auto", // Allow horizontal scrolling
            width: "100%", // Take full width of the container
            height: "700px", // Set a fixed height for the iframe
          }}
        >
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              width="100%"
              height="100%"
              style={{
                transform: `scale(${zoomLevel})`, // Zoom effect applied to the iframe
                transformOrigin: "top left", // Keep zoom centered at the top-left corner
                border: "none", // Optional, remove iframe border
              }}
              title="Protected PDF"
            ></iframe>
          ) : (
            <p>Loading PDF...</p>
          )}
        </div>
      </Card>
    </Container>
  );
};

export default App;
