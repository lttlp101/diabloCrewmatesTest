// components/Navbar/Navbar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import Header from "../Header/Header";

const Navbar = () => {
	return (
		<nav className={styles.navbar}>
			<ul className={styles.navList}>
				<li className={styles.navItem}>
					<Header />
				</li>
				<li className={styles.navItem}>
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? styles.activeLink : styles.link
						}
					>
						Home
					</NavLink>
				</li>
				<li className={styles.navItem}>
					<NavLink
						to="/create"
						className={({ isActive }) =>
							isActive ? styles.activeLink : styles.link
						}
					>
						Create a Crewmate!
					</NavLink>
				</li>
				<li className={styles.navItem}>
					<NavLink
						to="/gallery"
						className={({ isActive }) =>
							isActive ? styles.activeLink : styles.link
						}
					>
						Crewmate Gallery
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
