// routes/router.jsx

import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";

// Lazy load page components
const Home = lazy(() => import("../pages/Home/Home"));
const CreateCrewmate = lazy(() =>
	import("../pages/CreateCrewmate/CreateCrewmate")
);
const UpdateCrewmate = lazy(() =>
	import("../pages/UpdateCrewmate/UpdateCrewmate")
);
const CrewmateGallery = lazy(() =>
	import("../pages/CrewmateGallery/CrewmateGallery")
);
const CrewmateDetail = lazy(() =>
	import("../pages/CrewmateDetail/CrewmateDetail")
);

// Loading fallback component
const PageLoader = () => (
	<div className="page-loader">
		<div className="loader-content">
			<h2>Loading...</h2>
			<div className="spinner"></div>
		</div>
	</div>
);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: (
					<Suspense fallback={<PageLoader />}>
						<Home />
					</Suspense>
				),
			},
			{
				path: "create",
				element: (
					<Suspense fallback={<PageLoader />}>
						<CreateCrewmate />
					</Suspense>
				),
			},
			{
				path: "gallery",
				element: (
					<Suspense fallback={<PageLoader />}>
						<CrewmateGallery />
					</Suspense>
				),
			},
			{
				path: "crewmate/:name",
				element: (
					<Suspense fallback={<PageLoader />}>
						<CrewmateDetail />
					</Suspense>
				),
			},
			{
				path: "edit/:name",
				element: (
					<Suspense fallback={<PageLoader />}>
						<UpdateCrewmate />
					</Suspense>
				),
			},
		],
	},
]);

export default router;
