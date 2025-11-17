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
import HeroSection from "@/components/HeroSection";
import { cn } from "@/lib/utils";

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
    const all = countryCodes.all();
    const seen = new Set();

    const unique = [];

    for (const c of all) {
      if (!c.countryCallingCode) continue;

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
  }, []);

  const [selectedCountryValue, setSelectedCountryValue] = useState(
    () => countryOptions[0]?.value ?? ""
  );

  function onSubmit(values) {
    const selected = countryOptions.find(
      (c) => c.value === selectedCountryValue
    );

    const dial = selected?.dial ?? "";
    const localPhone = values.phone?.trim() ?? "";
    const fullPhone = `${dial} ${localPhone}`.trim();

    // TODO: replace with API call or integration
    console.log("Contact form submitted:", {
      ...values,
      phone: fullPhone,
    });
  }

  return (
    <NavbarProvider>
      <div className="flex min-h-screen flex-col bg-background pt-32">
        <NavbarComponent />
        <HeroSection
          sectionId="blog-hero"
          className={cn("")}
          backgroundImage={"./bg-blog.webp"}
          badge="Blog"
          title="Explore Various Activities, Events, And Everything About Us."
          titleAs="h1"
        />

        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-16 sm:px-6 lg:px-8">
          <section className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start">
            <div className="space-y-6">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
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
              <div className="mb-6 space-y-2">
                <p className="text-xs font-semibold tracking-[0.25em] text-muted-foreground">
                  CONTACT US
                </p>
                <h2 className="text-xl font-semibold tracking-tight">
                  Tell us about your next project
                </h2>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name *</FormLabel>
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
                          <FormLabel>Last name *</FormLabel>
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
                        <FormLabel>Email *</FormLabel>
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
                    <FormLabel>Phone *</FormLabel>
                    <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] gap-3">
                      <div>
                        <Select
                          value={selectedCountryValue}
                          onValueChange={setSelectedCountryValue}
                        >
                          <SelectTrigger className="w-full justify-between">
                            <SelectValue placeholder="Code" />
                          </SelectTrigger>
                          <SelectContent align="start">
                            {countryOptions.map((country, index) => (
                              <SelectItem
                                key={`${country.code}-${country.dial}-${index}`}
                                value={country.value}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="text-lg">
                                    {country.flag}
                                  </span>
                                  <span className="flex-1 text-left">
                                    {country.name}
                                  </span>
                                  <span className="text-muted-foreground">
                                    {country.dial}
                                  </span>
                                </span>
                              </SelectItem>
                            ))}
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
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
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
                    <Button type="submit" className="w-full sm:w-auto">
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </NavbarProvider>
  );
}
