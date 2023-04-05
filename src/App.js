import "./styles/App.css";
import Footer from "./shared/Footer";
import Header from "./shared/Header";
import { Outlet } from "react-router-dom";
function App() {
  // using outlet helps reusing some 
  // components, By only passing new Components 
  // inside the <Outlet /> from nesting childs in 
  // router file 
  return (
    <div className="App">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
