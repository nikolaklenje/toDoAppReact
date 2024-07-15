import "../App.css";
import { useState, useEffect } from "react";

const Home = () => {
  const [toDoList, setToDoList] = useState([]);
  const [addingItems, setAddingItems] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(toDoList.length);
  const [editedItem, setEditedItem] = useState("");
  const [currentComponent, setCurrentComponent] = useState();
  const [toDoItem, setToDoItem] = useState({
    id: currentIndex,
    listItem: "",
    complete: false,
  });
  const useQueryParams = () => {
    return new URLSearchParams(window.location.search);
  };
  const query = useQueryParams();
  useEffect(() => {
    setCurrentComponent(query.get("component"));
  }, [window.location.search]);

  const handleComponent = (componentName) => {
    query.set("component", componentName);
    window.history.pushState(null, "", `?${query.toString()}`);
    setCurrentComponent(componentName);
  };
  const submitToList = (e) => {
    if (toDoItem.listItem) {
      if (!editedItem) {
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
      {currentComponent === "Input" ? (
        <div>
          <input
            onChange={(e) => {
              setToDoItem({ ...toDoItem, listItem: e.target.value });
            }}
            type="text"
            value={toDoItem.listItem}
          ></input>
          {editedItem ? (
            <button
              onClick={() => {
                submitToList();
                handleComponent("");
              }}
            >
              Edit Item
            </button>
          ) : (
            <button
              onClick={() => {
                submitToList();
                handleComponent("");
              }}
            >
              Add Item
            </button>
          )}
          <button
            onClick={() => {
              handleComponent("");
              setToDoItem({ id: null, listItem: "", complete: false });
            }}
          >
            {" "}
            Back
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleComponent("Input")}>
            Add Items To a List?
          </button>
          <p>TO DO List:</p>
          <ul>
            {toDoList.map((todo, index) => (
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
                          handleComponent("Input");
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
