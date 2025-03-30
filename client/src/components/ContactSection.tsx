import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSubmissionSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SocialIcon } from "@/assets/icons";

// Extend the schema with validation rules
const formSchema = insertContactSubmissionSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  place: z.string().min(2, "Please enter your location"),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      place: "",
    },
  });

  // Setup mutation for form submission
  const submitMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      // Redirect to WhatsApp after successful submission
      const whatsappNumber = "917736029821";
      const message = `Hello OLGA Solar, I'm ${form.getValues().name} from ${form.getValues().place}. I'm interested in your solar products. Please contact me.`;
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, "_blank");
      
      // Reset form
      form.reset();
      
      // Show success toast
      toast({
        title: "Form submitted successfully",
        description: "You will be redirected to WhatsApp to continue the conversation.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error submitting form",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    submitMutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-[#1E293B] mb-2">Contact Us</h2>
          <div className="w-20 h-1 bg-[#008FD5] mx-auto mb-4"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Ready to start your solar journey? Fill out the form below and our team will get back to you shortly.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-50 rounded-lg p-8 shadow-md">
            <h3 className="text-xl font-bold font-montserrat text-[#1E293B] mb-6">Send Us a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Name" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008FD5]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your.email@example.com" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008FD5]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Phone</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="Your Phone Number" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008FD5]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="place"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Place</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Location" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008FD5]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="pt-2">
                  <Button 
                    type="submit" 
                    className="w-full bg-[#008FD5] hover:bg-[#008FD5]/90 text-white font-medium py-3 px-6 rounded-md transition-colors"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit & Connect on WhatsApp"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold font-montserrat text-[#1E293B] mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="w-12 h-12 rounded-full bg-[#008FD5]/10 flex items-center justify-center text-[#008FD5] mr-4">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-[#1E293B] mb-1">Our Location</h4>
                  <p className="text-gray-600">123 Solar Street, Green City, IN 560001</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-12 h-12 rounded-full bg-[#008FD5]/10 flex items-center justify-center text-[#008FD5] mr-4">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-[#1E293B] mb-1">Phone Number</h4>
                  <p className="text-gray-600">+91 7736029821</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-12 h-12 rounded-full bg-[#008FD5]/10 flex items-center justify-center text-[#008FD5] mr-4">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-[#1E293B] mb-1">Email Address</h4>
                  <p className="text-gray-600">info@olgasolar.com</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-12 h-12 rounded-full bg-[#008FD5]/10 flex items-center justify-center text-[#008FD5] mr-4">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-[#1E293B] mb-1">Working Hours</h4>
                  <p className="text-gray-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-8">
              <h4 className="font-medium text-[#1E293B] mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                <SocialIcon type="facebook" />
                <SocialIcon type="twitter" />
                <SocialIcon type="instagram" />
                <SocialIcon type="linkedin" />
                <SocialIcon type="whatsapp" href="https://wa.me/917736029821" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
