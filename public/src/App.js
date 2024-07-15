import AppRoutes from "./pages/Routers/AppRoutes";
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'


function App() {
  return (

      <div className="mx-w-4 mx-auto">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6">
        <AppRoutes />
      </div>
      <Footer/>
    </div>

  );
}

export default App;
