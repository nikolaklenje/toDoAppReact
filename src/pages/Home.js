import "../App.css";
import { useState } from "react";

const Home = () => {
  const [toDoList, setToDoList] = useState([]);
  const [addingItems, setAddingItems] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(toDoList.length);
  const [editedItem, setEditedItem] = useState("");
  const [toDoItem, setToDoItem] = useState({
    id: currentIndex,
    listItem: "",
    complete: false,
  });
  const submitToList = (e) => {
    e.preventDefault();
    // why is no empty value allowed
    if (toDoItem.listItem) {
      if (!editedItem) {
        // why two time setToDoItem?
        setToDoItem({
          ...toDoItem,
          id: currentIndex,
          complete: false,
        });
        toDoList.push(toDoItem);
        setAddingItems(false);
        setToDoItem({
          id: currentIndex,
          listItem: "",
          complete: false,
        });
      } else {
        const indexToComplete = toDoList.findIndex(
          (item) => editedItem.listItem === item.listItem
        );
        const editedList = [...toDoList];
        editedList[indexToComplete].listItem = toDoItem.listItem;
        setAddingItems(false);
        // why is setEditItem different data type?
        setEditedItem(false);
        setToDoItem({
          id: currentIndex,
          listItem: "",
          complete: false,
        });
      }
    }
  };

  const handleDelete = (index, todo) => {
    setToDoList(toDoList.filter((item) => item.listItem !== todo.listItem));
  };
  const handleComplete = (todo) => {
    const indexToComplete = toDoList.findIndex(
      (item) => todo.listItem === item.listItem
    );
    // refactor this to use map instead of searching for index and then clone and then setting boolean prop
    const updatedList = [...toDoList];
    if (!updatedList[indexToComplete].complete) {
      updatedList[indexToComplete].complete = true;
    } else {
      updatedList[indexToComplete].complete = false;
    }
    setToDoList(updatedList);
  };

  // on edit, current value isn't set in input
  // when you click edit, than go back, than add items to list, edit button remains

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
//Napravi array of objects instead

//odradi rutiranje
