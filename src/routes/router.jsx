// routes/router.jsx

import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import CreateCrewmate from "../pages/CreateCrewmate/CreateCrewmate";
import UpdateCrewmate from "../pages/UpdateCrewmate/UpdateCrewmate";
import CrewmateGallery from "../pages/CrewmateGallery/CrewmateGallery";
import CrewmateDetail from "../pages/CrewmateDetail/CrewmateDetail";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "create",
				element: <CreateCrewmate />,
			},
			{
				path: "gallery",
				element: <CrewmateGallery />,
			},
			{
				path: "crewmate/:name",
				element: <CrewmateDetail />,
			},
			{
				path: "edit/:name",
				element: <UpdateCrewmate />,
			},
		],
	},
]);

export default router;
