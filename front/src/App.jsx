import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Http from './utils/Http';
import Utils from './utils/Utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const get_list = (funcAs200, funcAsErr) => {
    Http.request_get_list((statusCode, jsonBody) => {
      if (200 === statusCode) {
        if (!Utils.isEmpty(funcAs200)) {
          funcAs200(jsonBody);
        };
      } else {
        if (!Utils.isEmpty(funcAsErr)) {
          funcAsErr(statusCode, jsonBody);
        };
      };
    });
  };

  const get_done_list = (funcAs200, funcAsErr) => {
    Http.request_get_done_list((statusCode, jsonBody) => {
      if (200 === statusCode) {
        if (!Utils.isEmpty(funcAs200)) {
          funcAs200(jsonBody);
        };
      } else {
        if (!Utils.isEmpty(funcAsErr)) {
          funcAsErr(statusCode, jsonBody);
        };
      };
    });
  };

  const delete_list = (id, funcAs200, funcAsErr) => {
    Http.request_delete_list(id, (statusCode, jsonBody) => {
      if (200 === statusCode) {
        if (!Utils.isEmpty(funcAs200)) {
          funcAs200(jsonBody);
        };
      } else {
        if (!Utils.isEmpty(funcAsErr)) {
          funcAsErr(statusCode, jsonBody);
        };
      };
    });
  };

  const add_list = (title, detail, createdAt, funcAs200, funcAsErr) => {
    Http.request_add_list(title, detail, createdAt, (statusCode, jsonBody) => {
      if (200 === statusCode) {
        if (!Utils.isEmpty(funcAs200)) {
          funcAs200(jsonBody);
        };
      } else if (201 === statusCode) {
        if (!Utils.isEmpty(funcAs200)) {
          funcAs200(jsonBody);
        };
      } else {
        if (!Utils.isEmpty(funcAsErr)) {
          funcAsErr(statusCode, jsonBody);
        };
      };
    });
  };

  const patch_done_list = (listId,done, funcAs200, funcAsErr) => {
    Http.request_patch_done_list(listId,done, (statusCode, jsonBody) => {
      if (200 === statusCode) {
        if (!Utils.isEmpty(funcAs200)) {
          funcAs200(jsonBody);
        };
      } else {
        if (!Utils.isEmpty(funcAsErr)) {
          funcAsErr(statusCode, jsonBody);
        };
      };
    });
  };

  const update_list = (listId, title, detail, funcAs200, funcAsErr) => {
    Http.request_update_list(listId, title, detail, (statusCode, jsonBody) => {
      if (200 === statusCode || 201 === statusCode) {
        if (!Utils.isEmpty(funcAs200)) {
          funcAs200(jsonBody);
        };
      } else {
        if (!Utils.isEmpty(funcAsErr)) {
          funcAsErr(statusCode, jsonBody);
        };
      };
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              getList={get_list}
              getDoneList={get_done_list}
              addList={add_list}
              deleteList={delete_list}
              patchDoneList={patch_done_list}
              updateList={update_list}
            />
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}