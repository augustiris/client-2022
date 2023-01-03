import React from 'react'
import { useState } from 'react';
import { Form, Progress, Row, Col, Input, Button, Label } from 'reactstrap';
import './Label.css';

const ProgressBar = ({ items, section, sectionGoal, color }) => {

  const [goal, setGoal] = useState(sectionGoal)

  const getTotal = () => {
    let sum = 0;
    items.forEach(item => {
      sum += (
        item.data[section[0]] * item.count
      )
    })
    return sum
  }

  const handleSubmit = e => {
    e.preventDefault();
    setGoal(e.target[0].value)
  }

  return (
    <div>
        <Label>{section[1]} Goal: {goal}</Label>
        <Progress value={(getTotal()/goal)*100} color={color}/>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Input
                id="goal"
                name={section[1]}
                placeholder= {"New " + section[1] + " goal"}
                type="number"
              />
            </Col>
            <Col>
              <Button color='primary'>
                Submit
              </Button>
          </Col>
          </Row>
        </Form>
    </div>
  )
}

export default ProgressBar