import { checkForUnauthorizedResponse, customFetch } from "../../utils";
import { clearValues } from "../topic/topicSlice";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    console.log("Register response:", resp); // Debugging
    return resp.data;
  } catch (error) {
    console.error("Register error:", error?.response || error);
    return thunkAPI.rejectWithValue(
      error?.response?.data?.msg || "Something went wrong"
    );
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    console.log("Login response:", resp); // Debugging
    return resp.data;
  } catch (error) {
    console.error("Login error:", error?.response || error);
    return thunkAPI.rejectWithValue(
      error?.response?.data?.msg || "Invalid login credentials"
    );
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.patch(url, user);
    console.log("Update response:", resp); // Debugging
    return resp.data;
  } catch (error) {
    console.error("Update error:", error?.response || error);
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const clearStoreThunk = async (message, thunkAPI) => {
  try {
    console.log("Clearing store...");
    thunkAPI.dispatch(clearValues());
    return Promise.resolve();
  } catch (error) {
    console.error("Clear store error:", error);
    return Promise.reject();
  }
};
