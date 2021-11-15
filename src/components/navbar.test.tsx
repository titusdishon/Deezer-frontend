import { fireEvent, screen,render, waitFor } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { QueryClient, QueryClientProvider } from "react-query";

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
const queryClient = new QueryClient();

describe("Navbar Test", () => {
  test("Navbar should be present on the UI", async() => {
    const { getByRole } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    );
    const navBar: any = getByRole("navbar");
    expect(navBar).toBeInTheDocument()
  });
  test("Navbar should have an app title", async() => {
    const { getByRole } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    );
    const navBar: any = getByRole("app-title");
    expect(navBar).toBeInTheDocument()
  });
  test("App title should read 'DEEZER'", async() => {
    const { getByText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    );
    const navBar: any = getByText("DEEZER");
    expect(navBar).toBeInTheDocument()
  });
  test("App title should have a home link'", async() => {
    const { getByRole } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    );
    const navBar: any = getByRole("home-link");
    expect(navBar).toBeInTheDocument()
  });
  test("Renders search dialog on search bar click", async() => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    );
    const searchInputNode: any = getByLabelText("search");
    expect(searchInputNode.value).toMatch("");
    fireEvent.click(screen.getByTestId('search'))
    await waitFor(() => screen.getByRole('search-box'))
    expect(screen.getByRole('search-box')).toBeInTheDocument()
  });
  test("Search dialog should have an input that accepts text", async() => {
    const { getByTestId } = render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </Provider>
    );
    fireEvent.click(screen.getByTestId('search'))
    const searchInputNode: any = getByTestId("search-artist-input");
    expect(searchInputNode?.value).toMatch("");
    fireEvent.change(searchInputNode, { target: { value: "a" } });
    expect(searchInputNode.value).toMatch("a");
  });
});
