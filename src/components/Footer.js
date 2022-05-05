import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.css";

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ position: "relative", bottom: "0", top:"10%", width: "100%"}}
    >
      <Container>
        <Row>
          <Col className="text-center py-1 mt-4">
            <h5 className="text-white">Copyright &copy; Khana Khazana</h5>
            <div>
              <h6 className="my-2" style={{
                  color:"grey"
              }}>Developed By:</h6>
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                <h6
                  className="mr-3 name-links"
                  onClick={() =>
                    window.open("https://github.com/Aditya-Dawadikar")
                  }
                >
                  Aditya Dawadikar
                </h6>
                <h6
                  className="mr-3 name-links"
                  onClick={() =>
                    window.open("https://github.com/Gaurav-Gaikwad-1")
                  }
                >
                  Gaurav Gaikwad
                </h6>
              </Col>
              <Col
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <h6
                  className="mr-3 name-links"
                  onClick={() => window.open("https://github.com/IzacVrushabh")}
                >
                  Vrushabh Kulye
                </h6>
                <h6
                  className="mr-3 name-links"
                  onClick={() => window.open("https://github.com/Neha121s")}
                >
                  Neha Shelar
                </h6>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
//backgroundColor:"#dedede",
// add proper footer with dev names...
