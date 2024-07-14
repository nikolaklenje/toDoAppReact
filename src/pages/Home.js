import "../App.css";
import { useState } from "react";

const Home = () => {
  const [toDoList, setToDoList] = useState([]);
  const [addingItems, setAddingItems] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(toDoList.length);
  const [toDoItem, setToDoItem] = useState({
    id: currentIndex,
    listItem: "",
    complete: false,
  });
  const submitToList = (e) => {
    e.preventDefault();
    // if (listItem) {
    //   if (typeof currentIndex === "number") {
    //     const editedList = [...toDoList];
    //     editedList.splice(currentIndex, 1, listItem);
    //     setToDoList(editedList);
    //     setCurrentIndex(null);
    //   }
    if (toDoItem.listItem) {
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
    }
  };

  const handleDelete = (index, todo) => {
    setToDoList(toDoList.filter((item) => item.listItem !== todo.listItem));
  };
  const handleComplete = (todo) => {
    const indexToComplete = toDoList.findIndex(
      (item) => todo.listItem === item.listItem
    );
    const updatedList = [...toDoList];
    if (!updatedList[indexToComplete].complete) {
      updatedList[indexToComplete].complete = true;
    } else {
      updatedList[indexToComplete].complete = false;
    }
    setToDoList(updatedList);
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
          {typeof currentIndex === "number" ? (
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
              <>
                <li
                  className={todo.complete ? "list-item-complete" : "list-item"}
                >
                  {todo.listItem}
                </li>
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
                          setCurrentIndex(index);
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
              </>
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
