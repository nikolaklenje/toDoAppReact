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
    // why is no empty value allowed
    if (toDoItem.listItem) {
      if (!editedItem) {
        toDoList.push(toDoItem);
        setAddingItems(false);
      } else {
        const indexToComplete = toDoList.findIndex(
          (item) => editedItem.listItem === item.listItem
        );
        const editedList = [...toDoList];
        editedList[indexToComplete].listItem = toDoItem.listItem;
        setEditedItem("");
      }
    }
    setToDoItem({
      id: currentIndex,
      listItem: "",
      complete: false,
    });
    setAddingItems(false);
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

  // id of element is always the same

  return (
    <main className="App">
      {addingItems ? (
        <div>
          <input
            onChange={(e) => {
              setToDoItem({ ...toDoItem, listItem: e.target.value });
            }}
            type="text"
            value={editedItem.listItem}
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
