import React, { useState } from "react";
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
} from "react-bootstrap";
import { createPartiallyEmittedExpression } from "typescript";

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
          values[key],
        );
      }
      if (key.includes("volume")) {
        newPrescription[newPrescription.length - 1]["volume"] = Number(
          values[key],
        );
      }
    });

    setPrescription(newPrescription);
  };

  return (
    <>
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Graph prescription={prescription} />
            <Form
              onChange={handleSubmit(onSubmit)}
              onBlur={handleSubmit(onSubmit)}
              onSubmit={handleSubmit(onSubmit)}
            >
              {[...Array(pills).keys()].map((index) => {
                return (
                  <>
                    {index > 0 && <hr />}
                    <Form.Group controlId={`name-${index}`}>
                      <Form.Label>Medicine {index + 1}</Form.Label>
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
                    <Form.Group controlId={`volume-${index}`}>
                      <InputGroup>
                        {/* <InputGroup.Prepend>
                          <InputGroup.Text>
                            Volume {index + 1}
                          </InputGroup.Text>
                        </InputGroup.Prepend> */}
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
                    <Form.Group controlId={`time-${index}`}>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            Time
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          as="select"
                          name={`time-${index}`}
                          ref={register({ required: true })}
                        >
                          {[...Array(24).keys()].map((hour) => (
                            <option>{hour}</option>
                          ))}
                        </Form.Control>
                      </InputGroup>
                    </Form.Group>
                  </>
                );
              })}
              <Row cla>
                <Col>
                  <Button
                    type="submit"
                    className="w-100"
                    onClick={() => {
                      setPills(pills + 1);
                      handleSubmit(onSubmit);
                    }}
                  >
                    Add medicine
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="submit"
                    className="w-100"
                    onClick={() => {
                      setPills(pills - 1);
                      handleSubmit(onSubmit);
                    }}
                    disabled={pills === 1}
                  >
                    Remove medicine
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
