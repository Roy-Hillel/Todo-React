import React from "react";
import { ListGroup, Button, Alert } from "react-bootstrap";

const TodoCard = (props) => {
  return (
    <ListGroup.Item>
      <h3>{props.content}</h3>
      <p>Due : {props.due}</p>
      <Alert variant={props.checked ? "success" : "danger"}>
        Status : {props.checked ? "Completed" : "Uncompleted"}
      </Alert>
      <Button
        variant={props.checked ? "outline-danger" : "outline-success"}
        onClick={() => props.toggleMarkCompleted(props.date)}
        style={{ marginRight: "1rem" }}
      >
        {props.checked ? "Mark uncomplete" : "Mark complete"}
      </Button>
      <Button
        variant="outline-danger"
        onClick={() => props.removeTodo(props.date)}
      >
        Remove
      </Button>
    </ListGroup.Item>
  );
};

export default TodoCard;
