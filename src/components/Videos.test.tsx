import { validateEmail } from "../utils/ValidateInput";
import { fireEvent, render } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const middlewares: any[] = [];
const mockStore = configureStore(middlewares);

const initialState = {
  user: {
    currentUser: {
      id: 67,
      email: "titus@gmail.com",
      first_name: "mutiso",
      last_name: "dishon",
    },
    isAuthenticated: false,
  },
};
const store = mockStore(initialState);

describe("login describe statement", () => {
  test("validate function should pass on correct input", () => {
    const email: string = "testexample@gmail.com";
    expect(validateEmail(email)).toBe(true);
  });

  test("validate input should fail on incorrect input", () => {
    const email: string = "emailteststring";
    expect(validateEmail(email)).toBe(false);
  });

  test("Login form should be in the document", () => {
    const component = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputNode = component.getByLabelText("email");
    expect(inputNode).toBeInTheDocument();
  });

  test("email input should accept text", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const emailInputNode: any = getByLabelText("email");
    expect(emailInputNode.value).toMatch("");
    fireEvent.change(emailInputNode, { target: { value: "testing" } });
    expect(emailInputNode.value).toMatch("testing");
    const errorMessage: HTMLElement = getByText("Invalid Email Input");
    expect(errorMessage).toBeInTheDocument();
    fireEvent.change(emailInputNode, {
      target: { value: "testing@gmail.com" },
    });
    expect(errorMessage).not.toBeInTheDocument();
  });

  test("Validate password length", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const passwordInput: any = getByLabelText("password");
    expect(passwordInput.value).toMatch("");
    fireEvent.change(passwordInput, { target: { value: "pass" } });
    expect(passwordInput.value).toMatch("pass");
    const errorMessage: HTMLElement = getByText("Password is too short");
    expect(errorMessage).toBeInTheDocument();
    fireEvent.change(passwordInput, {
      target: { value: "examplepass" },
    });
    expect(errorMessage).not.toBeInTheDocument();
  });

  test("Should be able to submit data", () => {
    const mockFn = jest.fn();
    const { getByLabelText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const buttonNode = getByLabelText("submit-login");
    const loginForm = getByLabelText("login-form");
    loginForm.onsubmit = mockFn;
    fireEvent.submit(buttonNode);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("should redirect after login", () => {});
});