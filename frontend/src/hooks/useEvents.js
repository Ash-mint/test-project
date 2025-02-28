import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as eventService from "../services/eventService";
import { toast } from "sonner";

// Hook to get multiple events based on search term
export const useEvents = (searchTerm) => {
  return useQuery({
    queryKey: ["events", searchTerm],
    queryFn: () => eventService.getEvents(searchTerm),
  });
};

// Hook to get a single event by ID
export const useEvent = (id) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => eventService.getEventById(id),
    enabled: !!id, // only run when an ID is provided
  });
};

// Hook to create an event
export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: eventService.createEvent,
    onSuccess: () => {
      toast.success("Event created successfully!");
      queryClient.invalidateQueries(["events"]);
    },
    onError: () => {
      toast.error("Failed to create event. Please try again.");
    },
  });
};

// Hook to update an event
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => eventService.updateEvent(id, data),
    onSuccess: () => {
      toast.success("Event updated successfully!");
      queryClient.invalidateQueries(["events"]);
      queryClient.invalidateQueries(["event"]);
    },
    onError: () => {
      toast.error("Failed to update event. Please try again.");
    },
  });
};

// Hook to join an event
export const useJoinEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => eventService.joinEvent(id),
    onSuccess: () => {
      toast.success("Successfully joined the event!");
      queryClient.invalidateQueries(["events"]);
      queryClient.invalidateQueries(["event"]);
    },
    onError: () => {
      toast.error("Failed to join the event. Try again later.");
    },
  });
};

// Hook to delete an event
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => eventService.deleteEvent(id),
    onSuccess: () => {
      toast.success("Event deleted successfully!");
      queryClient.invalidateQueries(["events"]);
      queryClient.invalidateQueries(["event"]);
    },
    onError: () => {
      toast.error("Failed to delete event. Try again later.");
    },
  });
};

// Hook to get the events the user joined
export const useJoinedEvent = () => {
  return useQuery({
    queryKey: ["joinedEvents"],
    queryFn: () => eventService.joinedEvents(),
  });
};
