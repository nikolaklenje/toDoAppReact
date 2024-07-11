import "../App.css";
import { useState } from "react";

const Home = () => {
  const [toDoList, setToDoList] = useState([]);
  const [listItem, setListItem] = useState();
  //when item removed from to do remove from complete item as well
  const [completeItems, setCompleteItemsList] = useState([]);
  const [addingItems, setAddingItems] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const submitToList = (e) => {
    e.preventDefault();
    if (listItem) {
      if (typeof currentIndex === "number") {
        //nauci koj moj radis ovo dole
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
  //spike button submit i button

  const handleDelete = (index) => {
    const newToDo = [...toDoList];
    newToDo.splice(index, 1);
    setToDoList(newToDo);
  };
  //Refactor ova dva
  const handleComplete = (index) => {
    const doneList = [...completeItems];
    doneList.push(index);
    setCompleteItemsList(doneList);
  };
  // renderaj based on url
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
                  completeItems.includes(index)
                    ? "list-item-complete"
                    : "list-item"
                }
                key={index}
              >
                {todo}
                <p
                  className="list-item-option"
                  onClick={() => handleComplete(index)}
                >
                  complete
                </p>
                <p
                  className="list-item-option"
                  onClick={() => handleDelete(index)}
                >
                  delete
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
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};
export default Home;
