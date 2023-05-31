import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import TodoCard from "./TodoCard";
import DeleteAll from "./DeleteAll";
import axios from "axios";
import { ListGroup, Container, Row, Col, Button, Form } from "react-bootstrap";

const Todo = () => {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortBy, setSortBy] = useState(1); // 1: date added, 2: a-z, 3: due date ----> future feature - to allow sorting todos
  useEffect(() => {
    const fetchCurrentTodos = async () => {
      try {
        const newTodos = await axios.get(
          `http://localhost:5000?sortby=${sortBy}`
        );
        setTodos(newTodos.data);
        console.log(newTodos);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (todo.content && todo.due) {
      const newTodo = {
        ...todo,
        date: new Date().getTime().toString(),
        checked: false,
      };
      setTodo({ content: "", due: "" });
      await axios
        .post(`http://localhost:5000?sortby=${sortBy}`, newTodo)
        .then(async () => {
          const newTodos = await axios.get(
            `http://localhost:5000?sortby=${sortBy}`
          );
          setTodos(newTodos.data);
        });
    } else {
      alert("Must fill fields to add a new todo");
    }
  };

  const handleTodoChange = (e) => {
    e.preventDefault();
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const deleteAll = async () => {
    await axios.delete(`http://localhost:5000/delete`).then(() => setTodos([]));
  };
  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const toggleMarkCompleted = async (date) => {
    const changeMe = todos.find((todo) => todo.date === date);
    await axios
      .put(`http://localhost:5000?sortby=${sortBy}`, {
        date: date,
        changeTo: !changeMe.checked,
      })
      .then(async () => {
        const newTodos = await axios.get(
          `http://localhost:5000?sortby=${sortBy}`
        );
        setTodos(newTodos.data);
      });
  };

  const removeTodo = async (date) => {
    await axios
      .delete(`http://localhost:5000?sortby=${sortBy}`, {
        data: { date: date },
      })
      .then(async () => {
        const newTodos = await axios.get(
          `http://localhost:5000?sortby=${sortBy}`
        );
        setTodos(newTodos.data);
      });
  };

  return (
    <section className="section" style={{ margin: "2rem" }}>
      <Container>
        <h1>Your TODO's</h1>

        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Enter a new Todo : </Form.Label>
                <Form.Control
                  type="text"
                  name="content"
                  id="content"
                  value={todo.content}
                  onChange={handleTodoChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Enter Due Date : </Form.Label>
                <Form.Control
                  type="date"
                  name="due"
                  id="due"
                  value={todo.due}
                  onChange={handleTodoChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                variant="primary"
                style={{ marginTop: "0.5rem", marginBottom: "0.25rem" }}
                onClick={handleAddTodo}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          <Col>
            <DeleteAll deleteAll={deleteAll}></DeleteAll>
          </Col>
          <Col>
            <Button variant="secondary" onClick={toggleShowCompleted}>
              {showCompleted ? "Hide completed" : "Show completed"}
            </Button>
          </Col>
        </Row>

        <TodoList
          todos={todos}
          showCompleted={showCompleted}
          toggleMarkCompleted={toggleMarkCompleted}
          removeTodo={removeTodo}
        />
        {/* <ListGroup>
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
        </ListGroup> */}
      </Container>
    </section>
  );
};

export default Todo;
