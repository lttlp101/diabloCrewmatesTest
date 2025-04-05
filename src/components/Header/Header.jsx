// components/Header/Header.jsx

import React from "react";
import { Link } from "react-router-dom";
import diabloLogo from "../../assets/branding/diablo_title_with_flames.gif";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<div className={styles.header}>
			<Link to="/" className={styles.headerLink}>
				<div className={styles.logoContainer}>
					<img
						src={diabloLogo}
						alt="Diablo Crewmates Logo"
						className={styles.logo}
					/>
				</div>
				<h1 className={styles.title}>Crewmates</h1>
			</Link>
		</div>
	);
};

export default Header;
