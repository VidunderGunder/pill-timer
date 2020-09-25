import React, { Fragment, useEffect, useState } from "react";
import "styles/styles.css";
import "styles/bootstrap.scss";
import Graph from "components/Graph";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
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
  const { register, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "pills",
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({});
    }
  }, [fields]);

  const now = new Date(Date.now());

  return (
    <>
      <Background
        image={background}
        color={`rgba(${175}, ${175}, ${175}, ${0.5})`}
      />
      <Container>
        <div
          className="h-100 w-100 d-flex align-items-center pt-3"
          style={{ minHeight: "100vh" }}
        >
          <Card className="shadow w-100">
            <Card.Body>
              <h3 className="text-center">Pill Timer</h3>
              <hr />
              <Graph prescription={useWatch({ control }).pills} />
              <Form>
                {fields.map(({ id, name, volume, time }, index) => {
                  return (
                    <Row key={id}>
                      {index > 0 && <hr />}
                      <Col>
                        <Form.Group>
                          <Form.Control
                            as="select"
                            name={`pills[${index}].name`}
                            ref={register({ required: true })}
                          >
                            <option>Ritalin MR</option>
                            <option>Ritalin IR</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                      <Col sm="12" md="8" lg="6">
                        <Row>
                          <Col xs="12" sm>
                            <Form.Group>
                              <InputGroup>
                                <Form.Control
                                  type="number"
                                  step="10"
                                  min={0}
                                  max={1000}
                                  defaultValue={20}
                                  name={`pills[${index}].volume`}
                                  ref={register({ required: true })}
                                />
                                <InputGroup.Append>
                                  <InputGroup.Text>mg</InputGroup.Text>
                                </InputGroup.Append>
                              </InputGroup>
                            </Form.Group>
                          </Col>
                          <Col xs="12" sm>
                            <Form.Group>
                              <InputGroup>
                                <Form.Control
                                  as="select"
                                  name={`pills[${index}].time`}
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
                          <Col sm="auto" xs="12">
                            <ButtonGroup className="w-100">
                              <Button
                                variant="light"
                                className="border"
                                style={{ width: "2.5em" }}
                                onClick={() => {
                                  append({});
                                }}
                                disabled={fields.length >= 20}
                              >
                                <b>+</b>
                              </Button>
                              <Button
                                variant="light"
                                className="border"
                                style={{ width: "2.5em" }}
                                onClick={() => remove(index)}
                                disabled={fields.length === 1}
                              >
                                <b>-</b>
                              </Button>
                            </ButtonGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  );
                })}
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};
