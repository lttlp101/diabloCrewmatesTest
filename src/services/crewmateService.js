// services/crewmateService.js

import { supabase } from "./client";

export const getAllCrewmates = async () => {
	const { data, error } = await supabase
		.from("Crewmates")
		.select("*")
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data;
};

export const getCrewmateByName = async (name) => {
	const { data, error } = await supabase
		.from("Crewmates")
		.select("*")
		.eq("name", name)
		.single();

	if (error) throw error;
	return data;
};

export const createCrewmate = async (crewmate) => {
	const { data, error } = await supabase
		.from("Crewmates")
		.insert([{ ...crewmate, created_at: new Date() }])
		.select();

	if (error) throw error;
	return data[0];
};

export const updateCrewmate = async (name, updates) => {
	const { data, error } = await supabase
		.from("Crewmates")
		.update(updates)
		.eq("name", name)
		.select();

	if (error) throw error;
	return data[0];
};

export const deleteCrewmate = async (name) => {
	const { error } = await supabase
		.from("Crewmates")
		.delete()
		.eq("name", name);

	if (error) throw error;
	return true;
};
