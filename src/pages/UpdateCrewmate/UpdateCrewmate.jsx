// pages/UpdateCrewmate/UpdateCrewmate.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
				if (!data) {
					// Redirect to NotFound if crewmate doesn't exist
					navigate("/not-found", { replace: true });
					return;
				}
				setCrewmate(data);
			} catch (err) {
				setError("Failed to load crewmate. Please try again.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchCrewmate();
	}, [name, navigate]);

	// Rest of the component remains the same...
};

export default UpdateCrewmate;
