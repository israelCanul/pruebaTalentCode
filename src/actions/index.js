import { localData } from "../helpers";
export const FETCHDATA = "FETCHDATA";

export const TOGGLEMODAL = "TOGGLEMODAL";

export const fetchDataItems = () => async (dispatch, store) => {
  dispatch({
    type: FETCHDATA,
    payload: { items: localData },
  });
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
