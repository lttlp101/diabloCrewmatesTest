// pages/Home/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import diabloGroupPic from "../../assets/branding/diablo_all_classes.png";
import diabloTitleLogo from "../../assets/branding/diablo_logo.webp";

import styles from "./Home.module.css";

const Home = () => {
	return (
		<div className={styles.homePage}>
			<h1 className={styles.title}>Welcome to the Crewmate Creator!</h1>

			<p className={styles.description}>
				Here is where you can create your very own set of crewmates
				before sending them off into space!
			</p>

			<div className={styles.crewmateImages}>
				<img src={diabloGroupPic} alt="Diablo All Classes Pic" />
				<img src={diabloTitleLogo} alt="Diablo Logo" />
			</div>

			<Link to="/create" className={styles.createButton}>
				Create Your First Crewmate
			</Link>
		</div>
	);
};

export default Home;
