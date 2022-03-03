
import axios from "axios";
export const FETCHDATA = "FETCHDATA";
export const TOGGLEMODAL = "TOGGLEMODAL";

export const fetchDataItems = () => async (dispatch, store) => {
  axios
    .get("http://localhost:3200/fetchData")
    .then(function (response) {
      if (response.data.code === 0) {
        dispatch({
          type: FETCHDATA,
          payload: { items: response.data.items },
        });
      } else {
        dispatch({
          type: FETCHDATA,
          payload: { items: [] },
        });
      }
    })
    .catch(function (error) {
      dispatch({
        type: FETCHDATA,
        payload: { items: [] },
      });
    });

  // dispatch({
  //   type: FETCHDATA,
  //   payload: { items: localData },
  // });
};

export const toggleModal =
  (item = null) =>
  async (dispatch, store) => {
    let state = store();
    if (state.site.modalIsOpen === true) {
      dispatch({
        type: TOGGLEMODAL,
        payload: { open: false, item: item },
      });
    } else {
      dispatch({
        type: TOGGLEMODAL,
        payload: { open: true, item: item },
      });
    }
  };

export const sendForm =
  (obj = {}) =>
  (dispatch, store) => {
    console.log(obj);
    axios
      .post("http://localhost:3200/sendEmail", obj)
      .then(function (response) {
        console.log(response);
        if (response.data.code === 0) {
          alert("Formulario enviado");
          dispatch({
            type: TOGGLEMODAL,
            payload: { open: false, item: null },
          });
        } else {
          alert(response.data.error);
          dispatch({
            type: TOGGLEMODAL,
            payload: { open: false, item: null },
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("Error - " + error.message);
      });
  };
