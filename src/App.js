// App.js
import './App.css';
import AuthHeader from "./components/AuthHeader";
import MovieExplorer from "./components/MovieExplorer";

function App() {
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <AuthHeader />
      <MovieExplorer />
    </div>
  );
}

export default App;
