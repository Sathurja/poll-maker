import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Edit from "./components/Edit";
import Polling from "./components/Polling";
import Results from "./components/Results";

export default function App() {
  return (
    <div className="App">
      <Router>

        <Navbar/>
        
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/polling" element ={<Polling />} />
          <Route path="/results" element={<Results />} />
        </Routes>


      </Router>
    </div>
  )
}



// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Main from "./components/Main";
// import Edit from "./components/Edit";
// import Polling from "./components/Polling";
// import Results from "./components/Results";

// export default function App() {
//   return (
//     <div className="App">
//       <Navbar/>
//       <Main />
//       <Polling />
//       <Results />
//     </div>

//   )
// }


















































/*
export default function App() {
  return (
      <Router>
        <Navbar/>
        <br/>
          <Route path="/" component={Main} />
          <Route path="/edit:id" component={Edit} />
          <Route path="/polling:id" component={Polling} />
      </Router>    

  )
}
*/





/*
import React from "react";
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Main from "./components/Main";

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <Main />
    </div>

  )
}



// <Router>
//   <Navbar/>
//   <Routes>
//     <Route path="/" element={<Main />} />
//   </Routes>
// </Router>
*/





/*

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/edit:id" element={<Edit />} />
          <Route path="/polling:id" element={<Polling />} />
        </Routes>
      </Router>
    </div>
    

  )
}*/