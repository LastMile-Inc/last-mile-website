import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { submitContactEmail } from "@/app/lib/submitContactEmail";

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  role: string;
  message: string;
}

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setIsError(false);

    try {
      await submitContactEmail({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        company: data.company,
        role: data.role,
        intent: "contact",
        intentLabel: "General contact inquiry",
        message: data.message,
        pageName: "Contact",
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        reset();
      }, 5000);
    } catch (err) {
      console.error('ContactForm caught:', err);
      setIsSubmitting(false);
      setIsError(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-[#1d7cd8]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-[#1d7cd8] w-10 h-10" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Thank you for reaching out.</h3>
        <p className="text-slate-400">
          We have received your message and will be with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstname" className="text-white">
            First Name *
          </Label>
          <Input
            id="firstname"
            {...register("firstname", { required: "First name is required" })}
            className="mt-2 bg-slate-800/50 border-slate-700 text-white"
            placeholder="First name"
          />
          {errors.firstname && <p className="text-red-400 text-sm mt-1">{errors.firstname.message}</p>}
        </div>
        <div>
          <Label htmlFor="lastname" className="text-white">
            Last Name *
          </Label>
          <Input
            id="lastname"
            {...register("lastname", { required: "Last name is required" })}
            className="mt-2 bg-slate-800/50 border-slate-700 text-white"
            placeholder="Last name"
          />
          {errors.lastname && <p className="text-red-400 text-sm mt-1">{errors.lastname.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-white">
          Email *
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          className="mt-2 bg-slate-800/50 border-slate-700 text-white"
          placeholder="your@email.com"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="company" className="text-white">
          Company *
        </Label>
        <Input
          id="company"
          {...register("company", { required: "Company is required" })}
          className="mt-2 bg-slate-800/50 border-slate-700 text-white"
          placeholder="Your company"
        />
        {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company.message}</p>}
      </div>

      <div>
        <Label htmlFor="role" className="text-white">
          Role *
        </Label>
        <select
          id="role"
          {...register("role", { required: "Role is required" })}
          className="mt-2 w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#1d7cd8]"
        >
          <option value="" className="bg-slate-900">Select your role...</option>
          <option value="accounting" className="bg-slate-900">Accounting</option>
          <option value="administrative" className="bg-slate-900">Administrative</option>
          <option value="business_development" className="bg-slate-900">Business Development</option>
          <option value="communications" className="bg-slate-900">Communications</option>
          <option value="consulting" className="bg-slate-900">Consulting</option>
          <option value="customer_service" className="bg-slate-900">Customer Service</option>
          <option value="design" className="bg-slate-900">Design</option>
          <option value="education" className="bg-slate-900">Education</option>
          <option value="engineering" className="bg-slate-900">Engineering</option>
          <option value="entrepreneurship" className="bg-slate-900">Entrepreneurship</option>
          <option value="finance" className="bg-slate-900">Finance</option>
          <option value="health_professional" className="bg-slate-900">Health Professional</option>
          <option value="human_resources" className="bg-slate-900">Human Resources</option>
          <option value="information_technology" className="bg-slate-900">Information Technology</option>
          <option value="legal" className="bg-slate-900">Legal</option>
          <option value="marketing" className="bg-slate-900">Marketing</option>
          <option value="operations" className="bg-slate-900">Operations</option>
          <option value="product" className="bg-slate-900">Product</option>
          <option value="project_management" className="bg-slate-900">Project Management</option>
          <option value="public_relations" className="bg-slate-900">Public Relations</option>
          <option value="quality_assurance" className="bg-slate-900">Quality Assurance</option>
          <option value="real_estate" className="bg-slate-900">Real Estate</option>
          <option value="recruiting" className="bg-slate-900">Recruiting</option>
          <option value="research" className="bg-slate-900">Research</option>
          <option value="sales" className="bg-slate-900">Sales</option>
          <option value="support" className="bg-slate-900">Support</option>
          <option value="retired" className="bg-slate-900">Retired</option>
        </select>
        {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role.message}</p>}
      </div>

      <div>
        <Label htmlFor="message" className="text-white">
          Message *
        </Label>
        <textarea
          id="message"
          {...register("message", { required: "Message is required" })}
          className="mt-2 w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-md text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#1d7cd8] min-h-[120px]"
          placeholder="Tell us about your project"
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
      </div>

      {isError && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong. Please try again or email us directly at{' '}
          <a href="mailto:contact@lastmileinc.ai" className="underline">contact@lastmileinc.ai</a>.
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full lm-button--primary"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
