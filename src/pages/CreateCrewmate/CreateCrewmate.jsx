// pages/CreateCrewmate/CreateCrewmate.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CrewmateForm from "../../components/CrewmateForm/CrewmateForm";
import { createCrewmate } from "../../services/crewmateService";
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
				{/* Add the crewmate group image here */}
			</div>

			{error && <p className={styles.error}>{error}</p>}

			<CrewmateForm onSubmit={handleSubmit} mode="create" />
		</div>
	);
};

export default CreateCrewmate;
