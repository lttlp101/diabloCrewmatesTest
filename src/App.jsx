// App.jsx

import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./styles/App.css";

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
