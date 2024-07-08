import "./App.css";
import { useState } from "react";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [listItem, setListItem] = useState();
  const [completeItems, setCompleteItemsList] = useState([]);
  const [addingItems, setAddingItems] = useState(false);
  const submitToList = (e) => {
    e.preventDefault();
    if (listItem) {
      setToDoList([...toDoList, listItem]);
      setAddingItems(false);
      setListItem("");
    }
  };
  const handleDelete = (index) => {
    const newToDo = [...toDoList];
    newToDo.splice(index, 1);
    setToDoList(newToDo);
  };
  const handleComplete = (index) => {
    const doneList = [...completeItems];
    doneList.push(index);
    setCompleteItemsList(doneList);
  };

  return (
    <main className="App">
      <div className="container">
        {addingItems ? (
          <div>
            <input
              onChange={(e) => {
                setListItem(e.target.value);
              }}
              type="text"
              value={listItem}
            ></input>
            <button onClick={submitToList}>Add Item</button>
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
                  <p className="list-item-option">edit</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;

//Delete i done

//Edit
//dodavanje na drugoj strani
