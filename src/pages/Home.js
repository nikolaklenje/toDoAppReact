import "../App.css";
import { useState, useEffect } from "react";

const useRouter = (url) => {
  const [router, setCounter] = useState({
    route: url.route, //"todo/edit/:id"
    routParams: {
      id: url.id, // 22
      val: url.val, // blaskloni
    },
    queryParams: {
      order: url.order,
      dir: url.dir,
    },
  });
  return router;
};
const Home = () => {
  let currentUrl = window.location.href;
  let itemId = Math.random().toString(16).slice(2); //napravi callback
  const location = window.location.pathname.split("/")[1];
  const [toDoList, setToDoList] = useState([]);
  const [editedItem, setEditedItem] = useState("");
  const [componentName, setComponentName] = useState(location);
  const [toDoItem, setToDoItem] = useState({
    id: null,
    listItem: "",
    complete: false,
  });
  let url = new URL(currentUrl);
  let params = new URLSearchParams(url.search);

  const addQueryParams = (todo) => {
    params.append("id", todo.id);
    params.append("val", todo.listItem); //skloni
    url.search = params.toString();
    window.history.pushState(null, "", url);
  };
  const removeQueryParams = () => {
    url.search = "";
    window.history.pushState(null, "", url);
  };
  const submitToList = (e) => {
    e.preventDefault();
    addQueryParams();
    if (!toDoItem.listItem && !editedItem.listItem) {
      alert("Input value or go back");
    } else {
      if (!editedItem) {
        toDoList.push({ ...toDoItem, id: itemId });
      } else {
        setToDoList(
          toDoList.map((item) =>
            item.id === editedItem.id
              ? { ...item, listItem: editedItem.listItem }
              : item
          )
        );
        setEditedItem("");
        removeQueryParams();
      }
      setToDoItem({
        id: null,
        listItem: "",
        complete: false,
      });
      setComponentName("");
    }
  };

  // todo/edit/:id
  // todo/edit/:val/:id
  // todo/edit/bla/22
  // todo/add
  // todo?order=name&dir=[asc|desc]

  /* we want hook useRouter that will return object like:
   router = {
    route: 'todo/edit/:id'
    routParams?: {
      id: '...' // 22
      val: '...'// bla
    },
    queryParams?: {
      order: 'name'
      dir: 'asc/desc'
    }
   }
   */

  // add login/signup/... pages

  const handleDelete = (todo) => {
    setToDoList(toDoList.filter((item) => item.id !== todo.id));
  };
  const handleComplete = (todo) => {
    setToDoList(
      toDoList.map((item) =>
        item.id === todo.id ? { ...item, complete: !item.complete } : item
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
              removeQueryParams();
              setToDoItem({ id: null, listItem: "", complete: false });
            }}
          >
            {" "}
            Back
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setComponentName("input");
              addQueryParams();
            }}
          >
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
                          addQueryParams(todo);
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
                    onClick={() => handleDelete(todo)}
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

//Napravi hook
//kako iz rute da isparsiram query params
//kako mise zove param i gde se nalazi i da parsiram url
//uzmes odredjeni zapis i iscupas iz njega nesto je parsiranje

//strogo vezano je za teksove
//da bi parsiara moras da znas pravila za odredeeni tip (Json i xml imaju razlicita pravila)

// UrlParams -> HOOK(urlParams)=> return {object of params}}=>
