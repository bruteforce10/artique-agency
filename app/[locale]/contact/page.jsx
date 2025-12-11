"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import countryCodes from "country-codes-list";
import { NavbarComponent } from "@/components/Navbar";
import { NavbarProvider } from "@/components/NavbarContext";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as Flags from "country-flag-icons/react/3x2";
import { useNavbarSection } from "@/components/NavbarContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon, AlertCircleIcon } from "lucide-react";

const contactSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  linkedin: z.string().optional(),
});

export default function ContactPage() {
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      linkedin: "",
    },
  });

  const countryOptions = useMemo(() => {
    try {
      // Safely get country codes with error handling
      const all = countryCodes?.all?.() || [];
      const seen = new Set();

      const unique = [];

      for (const c of all) {
        if (!c || !c.countryCallingCode) continue;

        const dial = `+${c.countryCallingCode}`;
        const key = `${c.countryCode}-${dial}`;

        if (seen.has(key)) continue;
        seen.add(key);

        unique.push({
          code: c.countryCode,
          dial,
          flag: c.flagEmoji,
          name: c.countryNameEn,
          value: key,
        });
      }

      return unique.sort((a, b) => a.name.localeCompare(b.name));
    } catch (error) {
      console.error("Error loading country codes:", error);
      // Return a default set of common countries as fallback
      return [
        { code: "US", dial: "+1", flag: "🇺🇸", name: "United States", value: "US-+1" },
        { code: "ID", dial: "+62", flag: "🇮🇩", name: "Indonesia", value: "ID-+62" },
        { code: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom", value: "GB-+44" },
        { code: "HK", dial: "+852", flag: "🇭🇰", name: "Hong Kong", value: "HK-+852" },
      ];
    }
  }, []);

  const [selectedCountryValue, setSelectedCountryValue] = useState(
    () => countryOptions[0]?.value ?? ""
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const selectedCountry = useMemo(() => {
    return countryOptions.find((c) => c.value === selectedCountryValue);
  }, [selectedCountryValue, countryOptions]);

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);
      setSubmitSuccess(false);
      setSubmitError(null);

      const selected = countryOptions.find(
        (c) => c.value === selectedCountryValue
      );

      const dial = selected?.dial ?? "";
      const localPhone = values.phone?.trim() ?? "";
      const fullPhone = `${dial} ${localPhone}`.trim();

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: fullPhone,
          description: values.message,
          linkedln: values.linkedin || null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit contact form");
      }

      setSubmitSuccess(true);
      form.reset();

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error.message || "Failed to submit contact form");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <NavbarProvider>
      <ContactPageContent
        form={form}
        countryOptions={countryOptions}
        selectedCountryValue={selectedCountryValue}
        setSelectedCountryValue={setSelectedCountryValue}
        selectedCountry={selectedCountry}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        submitSuccess={submitSuccess}
        submitError={submitError}
        setSubmitSuccess={setSubmitSuccess}
        setSubmitError={setSubmitError}
      />
    </NavbarProvider>
  );
}

function ContactPageContent({
  form,
  countryOptions,
  selectedCountryValue,
  setSelectedCountryValue,
  selectedCountry,
  onSubmit,
  isSubmitting,
  submitSuccess,
  submitError,
  setSubmitSuccess,
  setSubmitError,
}) {
  const heroSectionRef = useNavbarSection("contact-hero", true);
  const navbarSectionRef = useNavbarSection("contact", false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <NavbarComponent />
      <div ref={heroSectionRef} className="w-full relative">
        <img
          src="/bg-contact-us.webp"
          alt="Contact Us"
          className="w-full h-[300px] object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
        <section className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:items-start">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How Can We Help?
            </h1>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="max-w-md leading-relaxed">
                Unit 1104A, 11/F, Kai Tak Commercial Building, No. 317-319 Des
                Voeux Road. Central District, Hong Kong.
              </p>
              <div className="space-y-1">
                <p className="font-medium text-foreground">+852 5619 9075</p>
                <p className="font-medium text-foreground">
                  project@artique-agency.com
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card/60 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div className="mb-12 space-y-2">
              <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground">
                CONTACT US
              </p>
              <h2 className="text-xl font-semibold tracking-tight">
                Tell us about your next project
              </h2>
            </div>

            {submitSuccess && (
              <Alert className="mb-6">
                <CheckCircle2Icon />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>
                  Thank you for contacting us! We have received your message and
                  will get back to you as soon as possible.
                </AlertDescription>
              </Alert>
            )}

            {submitError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircleIcon />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{submitError}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          First name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage name="firstName" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Last name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage name="lastName" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage name="email" />
                    </FormItem>
                  )}
                />

                <div className="grid gap-3">
                  <FormLabel>
                    Phone <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="grid grid-cols-[minmax(0,0.2fr)_minmax(0,1.4fr)] gap-3">
                    <div>
                      <Select
                        value={selectedCountryValue}
                        onValueChange={setSelectedCountryValue}
                      >
                        <SelectTrigger className="w-fit justify-between">
                          <SelectValue placeholder="Code">
                            {selectedCountry
                              ? (() => {
                                  const FlagComponent =
                                    Flags[selectedCountry.code.toUpperCase()];
                                  return FlagComponent ? (
                                    <FlagComponent className="w-6 h-4" />
                                  ) : null;
                                })()
                              : null}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent align="start">
                          {countryOptions.map((country, index) => {
                            const FlagComponent =
                              Flags[country.code.toUpperCase()];
                            return (
                              <SelectItem
                                key={`${country.code}-${country.dial}-${index}`}
                                value={country.value}
                              >
                                <span className="flex items-center gap-2">
                                  {FlagComponent ? (
                                    <FlagComponent className="w-6 h-4" />
                                  ) : (
                                    <span className="text-lg">
                                      {country.flag}
                                    </span>
                                  )}
                                  <span className="flex-1 text-left">
                                    {country.name}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {country.dial}
                                  </span>
                                </span>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage name="phone" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormDescription>
                    Please include your country code and phone number.
                  </FormDescription>
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem ref={navbarSectionRef}>
                      <FormLabel>
                        Message <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <textarea
                          className="border-input dark:bg-input/30 mt-1 min-h-[120px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                          placeholder="Tell us about your next project..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage name="message" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.linkedin.com/in/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage name="linkedin" />
                    </FormItem>
                  )}
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
