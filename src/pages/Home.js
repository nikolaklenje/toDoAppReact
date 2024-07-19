import "../App.css";
import { useState, useEffect } from "react";

const Home = () => {
  let itemId = Math.random().toString(16).slice(2);
  const location = window.location.pathname.split("/")[1];
  const [toDoList, setToDoList] = useState([]);
  const [editedItem, setEditedItem] = useState("");
  const [componentName, setComponentName] = useState(location);
  const [toDoItem, setToDoItem] = useState({
    id: itemId,
    listItem: "",
    complete: false,
  });
  useEffect(() => {
    return window.history.pushState(null, "", `/${componentName}`);
  }, [componentName]);
  const submitToList = (e) => {
    e.preventDefault();
    if (!toDoItem.listItem && !editedItem.listItem) {
      alert("Input value or go back");
    } else {
      if (!editedItem) {
        toDoList.push(toDoItem);
      } else {
        setToDoList(
          toDoList.map((item) =>
            item.id === editedItem.id
              ? { ...item, listItem: editedItem.listItem }
              : item
          )
        );
        setEditedItem("");
      }
      setToDoItem({
        id: itemId,
        listItem: "",
        complete: false,
      });
      setComponentName("");
    }
  };

  const handleDelete = (index, todo) => {
    setToDoList(toDoList.filter((item) => item.listItem !== todo.listItem));
  };
  const handleComplete = (todo) => {
    setToDoList(
      toDoList.map((item) =>
        item.listItem === todo.listItem
          ? { ...item, complete: !item.complete }
          : item
      )
    );
  };
  return (
    <main className="App">
      {componentName === "input" ? (
        <div>
          <input
            onChange={(e) => {
              editedItem
                ? setEditedItem({ ...editedItem, listItem: e.target.value })
                : setToDoItem({ ...toDoItem, listItem: e.target.value });
            }}
            type="text"
            value={editedItem ? editedItem.listItem : toDoItem.listItem}
          ></input>
          {editedItem ? (
            <button onClick={submitToList}>Edit Item</button>
          ) : (
            <button onClick={submitToList}>Add Item</button>
          )}
          <button
            onClick={() => {
              setComponentName("");
              setEditedItem("");
              setToDoItem({ id: null, listItem: "", complete: false });
            }}
          >
            {" "}
            Back
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => setComponentName("input")}>
            Add Items To a List?
          </button>
          <p>TO DO List:</p>
          <ul>
            {toDoList.map((todo, index) => (
              <li key={todo.id}>
                <div
                  className={todo.complete ? "list-item-complete" : "list-item"}
                >
                  {todo.listItem}
                </div>
                <div>
                  {!todo.complete ? (
                    <>
                      <p
                        className="list-item-option"
                        onClick={() => handleComplete(todo)}
                      >
                        complete
                      </p>
                      <p
                        className="list-item-option"
                        onClick={() => {
                          setEditedItem(todo);
                          setComponentName("input");
                        }}
                      >
                        edit
                      </p>
                    </>
                  ) : (
                    <p
                      className="list-item-option"
                      onClick={() => handleComplete(todo)}
                    >
                      uncomplete
                    </p>
                  )}
                  <p
                    className="list-item-option"
                    onClick={() => handleDelete(index, todo)}
                  >
                    delete
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};
export default Home;
