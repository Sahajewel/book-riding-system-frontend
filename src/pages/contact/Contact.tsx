import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (data: FormValues) => {
    // Simulate request
    await new Promise((r) => setTimeout(r, 700));
    console.log("Contact form data:", data);
    setSubmitted(true);
    reset();
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center mt-10">Contact Us</h1>

      {submitted && (
        <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
          Thanks! Your message has been submitted.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 rounded-xl border">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Your name"
          />
          {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
            })}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            {...register("message", {
              required: "Message is required",
              minLength: { value: 10, message: "At least 10 characters" },
            })}
            className="w-full border rounded-lg px-3 py-2 h-32"
            placeholder="How can we help you?"
          />
          {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white  font-semibold disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>

      {/* Contact details */}
      <div className="mt-8 p-6 rounded-xl border">
        <h3 className="font-semibold mb-2">Other ways to reach us</h3>
        <p>Email: sahajewel072@gmail.com</p>
        <p>Phone: +81 80 5052 6822</p>
      </div>
    </div>
  );
}
