import "./App.css";
import { useState } from "react";

function App() {
  const [toDoList, setToDoList] = useState([]);
  const [listItem, setListItem] = useState();
  const [completeItems, setCompleteItemsList] = useState([]);
  const submitToList = (e) => {
    e.preventDefault();
    if (listItem) {
      setToDoList([...toDoList, listItem]);
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
        <input
          onChange={(e) => {
            setListItem(e.target.value);
          }}
          type="text"
          value={listItem}
        ></input>
        <button onClick={submitToList}>Add to the list</button>
        <div>
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
      </div>
    </main>
  );
}

export default App;

//Delete i done

//Edit
//dodavanje na drugoj strani
