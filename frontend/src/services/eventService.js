import axios from "../lib/axios";

export const getEvents = async (searchTerm = "") => {
  const response = await axios.get(
    `/api/events?search=${encodeURIComponent(searchTerm)}`
  );
  return response.data;
};

export const getEventById = async (id) => {
  const response = await axios.get(`/api/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  console.log(eventData);
  const response = await axios.post("/api/events", eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  console.log(eventData);
  const response = await axios.post(`/api/events/${id}?_method=PUT`, eventData);
  return response.data;
};

export const joinEvent = async (id) => {
  const response = await axios.post(`/api/events/${id}/join`);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await axios.delete(`/api/events/${id}`);
  return response.data;
};

export const joinedEvents = async () => {
  const response = await axios.get(`/api/user/events`);
  return response.data;
};
