import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Ui/Input/Input";
import Button from "../Ui/Button";
import { z } from "zod";
import { useEvent, useUpdateEvent } from "../../hooks/useEvents";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth";

const EditEventForm = () => {
  const nav = useNavigate();
  const { user } = useAuth();
  const { eventId } = useParams();

  const { data, isLoading, error } = useEvent(eventId);
  const { mutate } = useUpdateEvent();

  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const eventSchema = z
    .object({
      title: z.string().min(1, "Event title is required"),
      location: z.string().min(1, "Location is required"),
      start_date: z
        .string()
        .min(1, "Start date is required")
        .refine(
          (date) => {
            const parsedDate = new Date(date);
            return (
              !isNaN(parsedDate.getTime()) &&
              parsedDate >= new Date(new Date().setHours(0, 0, 0, 0))
            );
          },
          { message: "Start date cannot be in the past or invalid" }
        ),
      end_date: z
        .string()
        .min(1, "End date is required")
        .refine((date) => !isNaN(new Date(date).getTime()), {
          message: "Invalid end date format",
        }),
      description: z.string().optional(),
      max_participants: z.coerce
        .number()
        .int()
        .positive("Number of participants must be greater than zero"),
      thumbnail: z.instanceof(FileList).optional(),
    })
    .superRefine((data, ctx) => {
      const start = new Date(data.start_date);
      const end = new Date(data.end_date);

      if (end < start) {
        ctx.addIssue({
          path: ["end_date"],
          message: "End date cannot be before start date",
          code: "custom",
        });
      }
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      location: "",
      start_date: "",
      end_date: "",
      description: "",
      max_participants: "",
    },
  });

  // Update form values after data is fetched
  useEffect(() => {
    if (data) {
      reset({
        title: data.title || "",
        location: data.location || "",
        start_date: data.start_date || "",
        end_date: data.end_date || "",
        description: data.description || "",
        max_participants: `${data.max_participants}` || "",
      });
      setThumbnailPreview(data.thumbnail_url || null);
    }
  }, [data, reset]);

  const onSubmit = (formData) => {
    const dataToSubmit = new FormData();
    dataToSubmit.append("title", formData.title);
    dataToSubmit.append("location", formData.location);
    dataToSubmit.append("start_date", formData.start_date);
    dataToSubmit.append("end_date", formData.end_date);
    dataToSubmit.append("max_participants", formData.max_participants);
    dataToSubmit.append("description", formData.description || "");

    // Append file if it's selected
    if (formData.thumbnail && formData.thumbnail.length > 0) {
      dataToSubmit.append("thumbnail", formData.thumbnail[0]);
    }

    mutate(
      { id: eventId, data: dataToSubmit },
      {
        onSuccess: () => {
          nav(`/events/${eventId}`);
        },
      }
    );
  };

  // Handle image selection and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result); // Update preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Show a loading indicator while fetching the event.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  if (error || !data || !data.id) {
    return <Navigate to="/events" replace />;
  }
  if (!isLoading && user.id !== data.host.id)
    return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Edit Your Event</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Required fields are marked with an asterisk *
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="divide-y divide-gray-200"
            >
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Event Title*</label>
                  <Input
                    {...register("title", {
                      required: "Event title is required",
                    })}
                    type="text"
                    placeholder="Event title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Location*</label>
                  <Input
                    {...register("location", {
                      required: "Location is required",
                    })}
                    type="text"
                    placeholder="Event Location"
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm">
                      {errors.location.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col md:flex-row items-center space-x-4">
                  <div className="flex flex-col">
                    <label className="leading-loose">Start*</label>
                    <Input
                      {...register("start_date", {
                        required: "Start date is required",
                      })}
                      type="datetime-local"
                    />
                    {errors.start_date && (
                      <p className="text-red-500 text-sm">
                        {errors.start_date.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">End*</label>
                    <Input
                      {...register("end_date", {
                        required: "End date is required",
                      })}
                      type="datetime-local"
                    />
                    {errors.end_date && (
                      <p className="text-red-500 text-sm">
                        {errors.end_date.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Max participants*</label>
                  <Input
                    {...register("max_participants", {
                      required: "number of max participants is required",
                    })}
                    type="number"
                  />
                  {errors.max_participants && (
                    <p className="text-red-500 text-sm">
                      {errors.max_participants.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <label className="leading-loose">Event Description</label>
                <textarea
                  {...register("description")}
                  className="py-2 px-4 min-h-[100px] max-h-[300px] border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="Enter event description"
                  spellCheck="false"
                ></textarea>
              </div>

              {/* Thumbnail Input */}
              <div className="flex flex-col">
                <label className="leading-loose">Thumbnail</label>
                <Input
                  {...register("thumbnail")}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange} // Update preview when file is selected
                />
                {errors.thumbnail && (
                  <p className="text-red-500 text-sm">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>

              {/* Display the existing thumbnail if present */}
              {thumbnailPreview && (
                <div className="mt-2">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}

              <div className="pt-4 flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="justify-center inline-flex items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                >
                  Cancel
                </Link>
                <Button type="submit">Edit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventForm;
