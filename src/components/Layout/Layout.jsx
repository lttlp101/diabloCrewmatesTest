// components/Layout/Layout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./Layout.module.css";

const Layout = () => {
	return (
		<div className={styles.layout}>
			<aside>
				<Navbar />
			</aside>
			<main className={styles.content}>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
