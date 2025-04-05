// pages/NotFound/NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
	return (
		<div className={styles.notFoundPage}>
			<h1 className={styles.title}>404 - Page Not Found</h1>

			<div className={styles.content}>
				<p className={styles.message}>
					Oops! The crewmate you're looking for seems to have wandered
					off into space.
				</p>

				<div className={styles.imageContainer}>
					<img
						src="/src/assets/images/lost-crewmate.png"
						alt="Lost Crewmate"
						className={styles.image}
					/>
				</div>

				<p className={styles.submessage}>
					Don't worry, you can still return to a safe location.
				</p>

				<div className={styles.actions}>
					<Link to="/" className={styles.homeButton}>
						Back to Home
					</Link>
					<Link to="/gallery" className={styles.galleryButton}>
						View Crewmate Gallery
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
