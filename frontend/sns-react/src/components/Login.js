import React, { useReducer } from "react";
import { withCookies } from "react-cookie";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  INPUT_EDIT,
  TOGGLE_MODE,
} from "./actionTypes";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  span: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "teal",
  },
  spanError: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "fuchsia",
    marginTop: 10,
  },
}));

const initialState = {
  isLoading: false,
  isLoginView: true,
  error: "",
  credentialLog: {
    username: "",
    password: "",
  },
  credentialReg: {
    email: "",
    password: "",
  },
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case START_FETCH: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ERROR_CATCHED: {
      return {
        ...state,
        error: "Email or password is not correct!",
      };
    }
    case INPUT_EDIT: {
      return {
        ...state,
        [action.inputName]: action.payload,
      };
    }
    case TOGGLE_MODE: {
      return {
        ...state,
        isLoginView: !state.isLoginView,
      };
    }
    default:
      return state;
  }
};
const Login = (props) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(loginReducer, initialState);
  const inputChangedLog = () => (event) => {
    const cred = state.credentialLog;
    cred[event.target.name] = event.target.value;
    dispatch({
      type: INPUT_EDIT,
      inputName: "state.credentialLog",
      payload: cred,
    });
  };
  const inputChangedReg = () => (event) => {
    const cred = state.credentialReg;
    cred[event.target.name] = event.target.value;
    dispatch({
      type: INPUT_EDIT,
      inputName: "state.credentialReg",
      payload: cred,
    });
  };

  const login = async (event) => {
    // submit時にrefreshを防ぐ
    event.preventDefault();
    if (state.isLoginView) {
      try {
        dispatch({ type: START_FETCH });
        const res = await axios.get(
          "http://127.0.0.1:8000/authen/",
          state.credentialLog,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        //cookiesに格納
        props.cookies.set("current-token", res.data.token);
        res.data.token
          ? (window.location.href = "/profiles")
          : (window.location.href = "/");
        dispatch({ type: FETCH_SUCCESS });
      } catch {
        dispatch({ type: ERROR_CATCHED });
      }
    } else {
      try {
        dispatch({ type: START_FETCH });
        const res = await axios.get(
          "http://127.0.0.1:8000/api/user/create/",
          state.credentialReg,
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: TOGGLE_MODE });
      } catch {
        dispatch({ type: ERROR_CATCHED });
      }
    }
  };
  const toggleView = () => {
    dispatch({ type: TOGGLE_MODE });
  };
  return <div></div>;
};

export default Login;
