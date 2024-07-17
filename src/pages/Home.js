import "../App.css";
import { useState } from "react";

const Home = () => {
  const [toDoList, setToDoList] = useState([]);
  const [addingItems, setAddingItems] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(toDoList.length);
  const [editedItem, setEditedItem] = useState("");
  const [toDoItem, setToDoItem] = useState({
    listItem: "",
    complete: false,
  });
  const submitToList = (e) => {
    e.preventDefault();
    if (!toDoItem.listItem) {
      // checking this in order to prevent adding empty item to a list
      alert("Input value or go back");
    } else {
      if (!editedItem) {
        toDoList.push(toDoItem);
      } else {
        setToDoList(
          toDoList.map((item) =>
            item.listItem === editedItem.listItem
              ? { ...item, listItem: toDoItem.listItem }
              : item
          )
        );
        setEditedItem("");
      }
      setToDoItem({
        id: currentIndex,
        listItem: "",
        complete: false,
      });
      setAddingItems(false);
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
      {addingItems ? (
        <div>
          <input
            onChange={(e) => {
              setToDoItem({ ...toDoItem, listItem: e.target.value });
            }}
            type="text"
            value={toDoItem.listItem}
          ></input>
          {editedItem ? (
            <button onClick={submitToList}>Edit Item</button>
          ) : (
            <button onClick={submitToList}>Add Item</button>
          )}
          <button
            onClick={() => {
              setAddingItems(false);
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
          <button onClick={() => setAddingItems(true)}>
            Add Items To a List?
          </button>
          <p>TO DO List:</p>
          <ul>
            {toDoList.map((todo, index) => (
              // what if text is the same?
              // what if text is too long, will have impact on dom performance
              <li key={todo.listItem}>
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
                          setAddingItems(true);
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
