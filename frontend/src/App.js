import logo from './logo.svg';
import './App.css';
import Footer from './Layouts/Footer';
import Header from './Layouts/Header';
import Home from './Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
        <Route path="/" element={<Home />} exact="true" />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
