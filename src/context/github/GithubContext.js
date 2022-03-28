import { createContext, useReducer } from "react";
import React, { useCallback } from "react";
import githubReducer from "./GithubReducer";
const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
    repos:[]
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  const setloading = () => dispatch({ type: "SET_LOADING" });

  //get all user
  const searchUsers = useCallback(async (text) => {
    setloading();
    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(
      `https://api.github.com/search/users?${params}`
    );
    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  }, []);

  //get single user
  const getUser = useCallback(async (login) => {
    setloading();

    const response = await fetch(`https://api.github.com/users/${login}`);

    if (response.status === 404) {
      window.location = "/not found";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  }, []);

  //get  user Repo
  const getUserRepos = useCallback(async (login) => {
    setloading();

        const params = new URLSearchParams({
          sort:'created',
          per_page:10,
        });

    const response = await fetch(`https://api.github.com/users/${login}/repos?${params}`);

    if (response.status === 404) {
      window.location = "/not found";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_REPOS",
        payload: data,
      });
    }
  }, []);

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos:state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
