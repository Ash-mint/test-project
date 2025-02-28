import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Ui/Input/Input";
import Button from "../Ui/Button";
import { z } from "zod";
import { useCreateEvent } from "../../hooks/useEvents";

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

const CreateEventForm = () => {
  const nav = useNavigate();
  const { mutate } = useCreateEvent();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
  });

  // Handle form submission
  const onSubmit = (form) => {
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("location", form.location);
    formData.append("start_date", form.start_date);
    formData.append("end_date", form.end_date);
    formData.append("max_participants", form.max_participants);
    formData.append("description", form.description || "");

    // Only append thumbnail if a new file is provided
    if (form.thumbnail && form.thumbnail.length > 0) {
      formData.append("thumbnail", form.thumbnail[0]);
    }

    mutate(formData, {
      onSuccess: () => {
        nav(`/events`); // Redirect after successful update
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Create an Event</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Required fields are marked with an asterisk *
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="divide-y divide-gray-200"
              encType="multipart/form-data"
            >
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose">Event Title*</label>
                  <Input
                    {...register("title")}
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
                    {...register("location")}
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
                    <Input {...register("start_date")} type="datetime-local" />
                    {errors.start_date && (
                      <p className="text-red-500 text-sm">
                        {errors.start_date.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">End*</label>
                    <Input {...register("end_date")} type="datetime-local" />
                    {errors.end_date && (
                      <p className="text-red-500 text-sm">
                        {errors.end_date.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose">Max participants*</label>
                  <Input {...register("max_participants")} type="number" />
                  {errors.max_participants && (
                    <p className="text-red-500 text-sm">
                      {errors.max_participants.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose">Thumbnail</label>
                  <Input
                    {...register("thumbnail")}
                    type="file"
                    accept="image/*"
                  />
                  {errors.thumbnail && (
                    <p className="text-red-500 text-sm">
                      {errors.thumbnail.message}
                    </p>
                  )}
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
              </div>

              <div className="pt-4 flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="justify-center inline-flex items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
                >
                  Cancel
                </Link>
                <Button type="submit">Create</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEventForm;
