import Header from "./components/Header";
import Todo from "./components/Todo";

// The main App component
function App() {
  return (
    <div className="App">
      {/* Render the Header component at the top of the app */}
      <Header />
      {/* Render the Todo component for task management */}
      <Todo />
    </div>
  );
}

// Export the App component to be used in other parts of the application
export default App;
