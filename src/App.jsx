import React, { Fragment, useState } from "react";
import "styles/styles.css";
import "styles/bootstrap.scss";
import Graph from "components/Graph";
import { useForm } from "react-hook-form";
import {
  Form,
  Container,
  Card,
  Button,
  Row,
  Col,
  InputGroup,
  ButtonGroup,
} from "react-bootstrap";
import Background from "components/Background";
import background from "images/background.jpg";
export default () => {
  const [pills, setPills] = useState(1);
  const [prescription, setPrescription] = useState();

  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => {
    // values.forEach((value) => {
    const keys = Object.keys(values);

    let newPrescription = [];

    keys.forEach((key, index) => {
      if (key.includes("name")) {
        newPrescription.push({ name: null, volume: null, time: null });
      }
      if (key.includes("name")) {
        newPrescription[newPrescription.length - 1]["name"] = values[key];
      }
      if (key.includes("time")) {
        newPrescription[newPrescription.length - 1]["time"] = Number(
          values[key]
        );
      }
      if (key.includes("volume")) {
        newPrescription[newPrescription.length - 1]["volume"] = Number(
          values[key]
        );
      }
    });

    setPrescription(newPrescription);
  };

  const now = new Date(Date.now());
  // const nowTime = `${now.getHours()}:${now.getMinutes()}`;

  return (
    <>
      <Background image={background} />
      <Container>
        <div
          className="h-100 w-100 d-flex align-items-center pt-3"
          style={{ minHeight: "100vh" }}
        >
          <Card className="shadow w-100">
            <Card.Body>
              <h3 className="text-center">Pill Timer</h3>
              <hr />
              <Graph prescription={prescription} />
              <Form
                onChange={handleSubmit(onSubmit)}
                onBlur={handleSubmit(onSubmit)}
                onSubmit={handleSubmit(onSubmit)}
              >
                {[...Array(pills).keys()].map((index) => {
                  return (
                    <>
                      {/* <p>Medicine {index + 1}</p> */}
                      <Row>
                        {index > 0 && <hr />}
                        <Col>
                          <Form.Group
                            controlId={`name-${index}`}
                            className="shadow-sm"
                          >
                            <Form.Control
                              as="select"
                              name={`name-${index}`}
                              ref={register({ required: true })}
                            >
                              {!prescription && <option value={null}></option>}
                              <option>Ritalin MR</option>
                              <option>Ritalin IR</option>
                            </Form.Control>
                          </Form.Group>
                        </Col>
                        <Col sm="8" md="6" lg="4">
                          <Row>
                            <Col>
                              <Form.Group
                                controlId={`volume-${index}`}
                                className="shadow-sm"
                              >
                                <InputGroup>
                                  <Form.Control
                                    type="number"
                                    step="10"
                                    min={0}
                                    max={1000}
                                    defaultValue={20}
                                    name={`volume-${index}`}
                                    ref={register({ required: true })}
                                  />
                                  <InputGroup.Append>
                                    <InputGroup.Text>mg</InputGroup.Text>
                                  </InputGroup.Append>
                                </InputGroup>
                              </Form.Group>
                            </Col>
                            <Col>
                              <Form.Group
                                controlId={`time-${index}`}
                                className="shadow-sm"
                              >
                                <InputGroup>
                                  <Form.Control
                                    as="select"
                                    name={`time-${index}`}
                                    ref={register({ required: true })}
                                    defaultValue={Math.floor(
                                      now.getHours() + now.getMinutes() / 60 + 1
                                    )}
                                  >
                                    {[...Array(24).keys()].map((hour) => (
                                      <Fragment key={`time-options-${hour}`}>
                                        <option
                                          value={hour}
                                        >{`${hour}:00`}</option>
                                        <option
                                          value={hour + 0.5}
                                        >{`${hour}:30`}</option>
                                      </Fragment>
                                    ))}
                                  </Form.Control>
                                </InputGroup>
                              </Form.Group>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </>
                  );
                })}
                <ButtonGroup className="w-100 shadow-sm">
                  <Button
                    type="submit"
                    variant="light"
                    className="w-100 border"
                    onClick={() => {
                      setPills(pills + 1);
                      handleSubmit(onSubmit);
                    }}
                  >
                    <b>+</b>
                  </Button>
                  <Button
                    type="submit"
                    variant="light"
                    className="w-100 border"
                    onClick={() => {
                      setPills(pills - 1);
                      handleSubmit(onSubmit);
                    }}
                    disabled={pills === 1}
                  >
                    <b>-</b>
                  </Button>
                </ButtonGroup>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};
