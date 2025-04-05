// pages/CreateCrewmate/CreateCrewmate.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCrewmate } from "../../services/crewmateService";
import CrewmateForm from "../../components/CrewmateForm/CrewmateForm";
import diabloGroupPic from "../../assets/branding/diablo_all_classes.png";
import styles from "./CreateCrewmate.module.css";

const CreateCrewmate = () => {
	const navigate = useNavigate();
	const [error, setError] = useState(null);

	const handleSubmit = async (crewmateData) => {
		try {
			await createCrewmate(crewmateData);
			navigate("/gallery");
		} catch (err) {
			setError("Failed to create crewmate. Please try again.");
			console.error(err);
		}
	};

	return (
		<div className={styles.createPage}>
			<h1 className={styles.title}>Create a New Crewmate</h1>

			<div className={styles.crewmateImage}>
				<img src={diabloGroupPic} alt="Diablo All Classes Pic" />
			</div>

			{error && <p className={styles.error}>{error}</p>}

			<CrewmateForm onSubmit={handleSubmit} mode="create" />
		</div>
	);
};

export default CreateCrewmate;
