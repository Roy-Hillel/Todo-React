import React from "react";
import TodoCard from "./TodoCard";

import { ListGroup } from "react-bootstrap";

const TodoList = ({
  todos,
  showCompleted,
  toggleMarkCompleted,
  removeTodo,
}) => {
  console.log(todos);
  return (
    <ListGroup>
      {todos.map(({ date, content, due, checked }) => {
        if (showCompleted || !checked) {
          return (
            <TodoCard
              key={date}
              date={date}
              content={content}
              due={due}
              checked={checked}
              toggleMarkCompleted={toggleMarkCompleted}
              removeTodo={removeTodo}
            />
          );
        }
      })}
    </ListGroup>
  );
};

export default TodoList;
