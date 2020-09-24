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
  // const prescription = [
  //   { name: "Ritalin MR", volume: 20, time: 8 },
  //   { name: "Ritalin MR", volume: 10, time: 14 },
  // ];

  const [pills, setPills] = useState(1);
  const [prescription, setPrescription] = useState([
    // { name: "Ritalin MR", volume: 20, time: 8 },
    // { name: "Ritalin MR", volume: 10, time: 14 },
  ]);

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

  console.log(prescription);

  return (
    <>
      <Container>
        <Card className="mt-3">
          <Card.Body>
            <Graph prescription={prescription} />
            <Form onChange={handleSubmit(onSubmit)}>
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
                        <option>Ritalin MR</option>
                        <option>Ritalin IR</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId={`volume-${index}`}>
                      <Form.Label>Volume {index + 1}</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          step="1"
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
                      <Form.Label>Time {index + 1}</Form.Label>
                      <Form.Control
                        as="select"
                        name={`time-${index}`}
                        ref={register({ required: true })}
                      >
                        {[...Array(24).keys()].map((hour) => (
                          <option>{hour}</option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </>
                );
              })}
            </Form>
            <Row cla>
              <Col>
                <Button className="w-100" onClick={() => setPills(pills + 1)}>
                  Add medicine
                </Button>
              </Col>
              <Col>
                <Button
                  className="w-100"
                  onClick={() => setPills(pills - 1)}
                  disabled={pills === 1}
                >
                  Remove medicine
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};
