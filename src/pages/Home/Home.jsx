// pages/Home/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
	return (
		<div className={styles.homePage}>
			<h1 className={styles.title}>Welcome to the Crewmate Creator!</h1>

			<p className={styles.description}>
				Here is where you can create your very own set of crewmates
				before sending them off into space!
			</p>

			<div className={styles.crewmateImage}>
				{/* Add the crewmate group image here */}
			</div>

			<Link to="/create" className={styles.ctaButton}>
				Create Your First Crewmate
			</Link>
		</div>
	);
};

export default Home;
