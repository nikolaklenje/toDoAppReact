import "../App.css";
import { useState } from "react";

const Home = () => {
  const [toDoList, setToDoList] = useState([]);
  const [listItem, setListItem] = useState();
  const [completeItems, setCompleteItemsList] = useState([]);
  const [addingItems, setAddingItems] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const submitToList = (e) => {
    e.preventDefault();
    if (listItem) {
      if (typeof currentIndex === "number") {
        const editedList = [...toDoList];
        editedList.splice(currentIndex, 1, listItem);
        setToDoList(editedList);
        setCurrentIndex(null);
      } else {
        setToDoList([...toDoList, listItem]);
      }
      setAddingItems(false);
      setListItem("");
    }
  };

  const handleDelete = (index, todo) => {
    setToDoList(toDoList.filter((item) => toDoList.indexOf(item) !== index));
    if (completeItems.includes(todo)) {
      setCompleteItemsList(completeItems.filter((item) => item !== todo));
    }
  };
  const handleComplete = (todo) => {
    const doneList = [...completeItems, todo];
    setCompleteItemsList(doneList);
  };
  const handleUncomplete = (todo) => {
    setCompleteItemsList(completeItems.filter((item) => item !== todo));
  };
  return (
    <main className="App">
      {addingItems ? (
        <div>
          <input
            onChange={(e) => {
              setListItem(e.target.value);
            }}
            type="text"
            value={listItem}
          ></input>
          {typeof currentIndex === "number" ? (
            <button onClick={submitToList}>Edit Item</button>
          ) : (
            <button onClick={submitToList}>Add Item</button>
          )}
          <button
            onClick={() => {
              setAddingItems(false);
              setListItem("");
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
              <li
                className={
                  completeItems.includes(todo)
                    ? "list-item-complete"
                    : "list-item"
                }
                key={index}
              >
                {todo}
                {!completeItems.includes(todo) ? (
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
                    onClick={() => handleUncomplete(todo)}
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};
export default Home;
//Check the filter and try to not create another array
//Napravi array of objects instead
// Proveri redosled dodavanja klasa
//odradi rutiranje
