import "../App.css";
import { useState, useEffect } from "react";
import Login from "./login";
import ResetPassword from "./resetPassword";
import SignUp from "./signUp";
import ForgotPassword from "./forgotPassword";

const genId = () => {
  let itemId = Math.random().toString(16).slice(2);
  return itemId;
};

const routs = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/resetPassword",
    element: <ResetPassword />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
];
const useRouter = (url, id) => {
  let query = window.location.search;
  let urlParams = new URLSearchParams(query);
  let orderParam = urlParams.get("order");
  let dirParam = urlParams.get("dir");
  const [router, setRouter] = useState({
    route: url,
    routParams: {
      id: id,
    },
    queryParams: {
      dir: orderParam,
      order: dirParam,
    },
  });
  useEffect(() => {
    setRouter({
      route: url,
      routParams: {
        id: id,
      },
      queryParams: {
        dir: dirParam,
        order: orderParam,
      },
    });
  }, [url]);
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

  const router = useRouter(window.location.href, editedItem.id);

  // console.log("DA VIDIMO OVO", router);
  let url = new URL(currentUrl);
  let params = new URLSearchParams(url.search);

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
    setComponentName("");
    removeQueryParams();
  }, []);
  const handleSorting = (sort) => {
    const sortedList = toDoList.sort((a, b) => {
      const toDo1 = a.listItem.toUpperCase();
      const toDo2 = b.listItem.toUpperCase();
      params.delete("dir");
      params.delete("order");
      params.append("order", "name");
      if (sort === "asc" && !params.has("dir", "asc")) {
        params.append("dir", "asc");
        url.search = params.toString();
        window.history.pushState(null, "", url);
        if (toDo1 < toDo2) {
          return -1;
        }
        if (toDo1 > toDo2) {
          return 1;
        } else {
          return 0;
        }
      } else if (sort === "desc" && !params.has("dir", "desc")) {
        params.append("dir", "desc");
        url.search = params.toString();
        window.history.pushState(null, "", url);
        if (toDo1 < toDo2) {
          return 1;
        }
        if (toDo1 > toDo2) {
          return -1;
        } else {
          return 0;
        }
      }
    });
    setToDoList([...sortedList]);
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
              handlePathName("todo/add");
            }}
          >
            Add Items To a List?
          </button>
          <div>
            {" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSorting("asc");
              }}
            >
              ASCENDING
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSorting("desc");
              }}
            >
              DESCENDING
            </button>
          </div>

          <p>TO DO List:</p>
          <ul>
            {toDoList.map((todo) => (
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
                          handlePathName(`todo/edit/${todo.id}`);
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
