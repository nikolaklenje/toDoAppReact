import "../App.css";
import { useState, useEffect } from "react";
import Login from "./login";
import ResetPassword from "./resetPassword";
import SignUp from "./signUp";
import ForgotPassword from "./forgotPassword";
const useRouter = (url) => {
  const [router, setRouter] = useState({
    route: url,
    routParams: {
      id: url.id, // 22
    },
    queryParams: {
      order: "1",
      dir: "2",
    },
  });
  return router;
};
const Home = () => {
  let currentUrl = window.location.href;

  const location = window.location.pathname.split("/")[1];
  const [toDoList, setToDoList] = useState([]);
  const [editedItem, setEditedItem] = useState("");
  const [componentName, setComponentName] = useState(location);
  const [toDoItem, setToDoItem] = useState({
    id: null,
    listItem: "",
    complete: false,
  });
  const router = useRouter(currentUrl);
  //console.log("Evo ti ga hook", router);
  let url = new URL(currentUrl);
  const genId = () => {
    let itemId = Math.random().toString(16).slice(2);
    return itemId;
  };
  const handlePathName = (pathname) => {
    url.pathname = pathname;
    window.history.pushState(null, "", url);
  };
  const removeQueryParams = () => {
    url.pathname = "";
    url.search = "";
    window.history.pushState(null, "", url);
  };
  useEffect(() => {
    if (location === "edit") {
      setComponentName("");
      removeQueryParams();
    }
  }, []);
  const handleSorting = () => {
    const sortedList = toDoList.sort((a, b) => {
      const toDo1 = a.listItem.toUpperCase();
      const toDo2 = b.listItem.toUpperCase();
      if (toDo1 < toDo2) {
        return -1;
      }
      if (toDo1 > toDo2) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log("OVO JE SORTIRANO", sortedList);
    setToDoList(sortedList);
  };
  const submitToList = (e) => {
    e.preventDefault();
    if (!toDoItem.listItem && !editedItem.listItem) {
      alert("Input value or go back");
    } else {
      if (!editedItem) {
        let itemId = genId();
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
      }
      setToDoItem({
        id: null,
        listItem: "",
        complete: false,
      });
      setComponentName("");
      removeQueryParams();
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
      {componentName === "add" || componentName === "edit" ? (
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
      ) : componentName === "login" ? (
        <Login />
      ) : componentName === "signup" ? (
        <SignUp />
      ) : componentName === "forgotpassword" ? (
        <ForgotPassword />
      ) : componentName === "resetpassword" ? (
        <ResetPassword />
      ) : (
        <div>
          <button
            onClick={() => {
              setComponentName("add");
              handlePathName("add");
            }}
          >
            Add Items To a List?
          </button>
          <div>
            {" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSorting();
              }}
            >
              ASCENDING
            </button>
            <button>DESCENDING</button>
          </div>

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
                          setComponentName("edit");
                          handlePathName(`edit/${todo.id}`);
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
