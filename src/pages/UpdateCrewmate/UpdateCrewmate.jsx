// pages/UpdateCrewmate/UpdateCrewmate.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CrewmateForm from "../../components/CrewmateForm/CrewmateForm";
import {
	getCrewmateByName,
	updateCrewmate,
	deleteCrewmate,
} from "../../services/crewmateService";
import styles from "./UpdateCrewmate.module.css";

const UpdateCrewmate = () => {
	const { name } = useParams();
	const navigate = useNavigate();
	const [crewmate, setCrewmate] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCrewmate = async () => {
			try {
				const data = await getCrewmateByName(name);
				setCrewmate(data);
			} catch (err) {
				setError("Failed to load crewmate. Please try again.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchCrewmate();
	}, [name]);

	const handleUpdate = async (updatedData) => {
		try {
			await updateCrewmate(name, updatedData);
			navigate(`/crewmate/${updatedData.name}`);
		} catch (err) {
			setError("Failed to update crewmate. Please try again.");
			console.error(err);
		}
	};

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this crewmate?")) {
			try {
				await deleteCrewmate(name);
				navigate("/gallery");
			} catch (err) {
				setError("Failed to delete crewmate. Please try again.");
				console.error(err);
			}
		}
	};

	if (loading) {
		return <div className={styles.loading}>Loading crewmate...</div>;
	}

	if (error) {
		return <div className={styles.error}>{error}</div>;
	}

	if (!crewmate) {
		return <div className={styles.notFound}>Crewmate not found.</div>;
	}

	return (
		<div className={styles.updatePage}>
			<h1 className={styles.title}>Update Your Crewmate :)</h1>

			<div className={styles.crewmateImage}>
				{/* Add the crewmate group image here */}
			</div>

			<div className={styles.currentInfo}>
				<h2>Current Crewmate Info:</h2>
				<p>
					Name: {crewmate.name}, Category: {crewmate.category}, Color:{" "}
					{crewmate.color}
				</p>
			</div>

			<CrewmateForm
				initialData={crewmate}
				onSubmit={handleUpdate}
				onDelete={handleDelete}
				mode="update"
			/>

			<div className={styles.actions}>
				<button className={styles.deleteBtn} onClick={handleDelete}>
					Delete Crewmate
				</button>
			</div>
		</div>
	);
};

export default UpdateCrewmate;
