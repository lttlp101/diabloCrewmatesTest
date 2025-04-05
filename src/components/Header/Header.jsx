// components/Header/Header.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<div className={styles.header}>
			<Link to="/" className={styles.headerLink}>
				{/* Logo and title are wrapped in a Link component */}
				<div className={styles.logoContainer}>
					<img
						src="/src/assets/branding/diablo-crewmates-logo.png"
						alt="Diablo Crewmates Logo"
						className={styles.logo}
					/>
				</div>
				<h1 className={styles.title}>Diablo Crewmates</h1>
			</Link>
		</div>
	);
};

export default Header;
