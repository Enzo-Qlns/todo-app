import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import Http from './utils/Http';
import Utils from './utils/Utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BasicSpeedDial from './components/common/SpeedDial';

export default function App() {

  const get_list = (funcAs200, funcAsErr) => {
    Http.request_get_list((statusCode, jsonBody) => {
      if (!Utils.isEmpty(funcAs200)) {
        if (200 === statusCode) {
          funcAs200(jsonBody);
        } else {
          if (!Utils.isEmpty(funcAsErr)) {
            funcAsErr(statusCode, jsonBody);
          };
        }
      };
    });
  };

  const add_list = (title, detail, createdAt, funcAs200, funcAsErr) => {
    Http.request_add_list(title, detail, createdAt, (statusCode, jsonBody) => {
      if (!Utils.isEmpty(funcAs200)) {
        if (200 === statusCode) {
          funcAs200(jsonBody);
        } else if (201 === statusCode) {
          funcAs200(jsonBody);
        } else {
          if (!Utils.isEmpty(funcAsErr)) {
            funcAsErr(statusCode, jsonBody);
          };
        }
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
              addList={add_list}
            />
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}