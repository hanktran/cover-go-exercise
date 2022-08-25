import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import { PageRoutes } from "./Routes";

function App() {
  return (
    <BrowserRouter>
      <div className="h-screen bg-blue-200">
        <Navbar />
        <div className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-2/3 mx-auto">
              <PageRoutes />
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
