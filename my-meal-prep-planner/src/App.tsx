// import "./App.css";
// import MealTable from "./components/MealTable";

// function App() {
//   return <MealTable />;
// }

// export default App;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AddMeal from "./components/Addmeal";
import MealTable from "./components/MealTable";
import MyNavbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<MealTable />} /> {/* Default homepage */}
        <Route
          path="/add-meal"
          element={
            <AddMeal fetchUpdatedMeals={() => console.log("Meal Added!")} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
