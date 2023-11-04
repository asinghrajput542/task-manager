import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";

// The main App component
function App() {
  return (
    <div className="App">
      {/* RouterProvider wraps the application and provides the router context */}
      <RouterProvider router={createBrowserRouter(routes)} />
    </div>
  );
}

// Export the App component to be used in other parts of the application
export default App;
