import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Phone, MapPin, Mail, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';
import { insertContactSubmissionSchema } from '@shared/schema';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';

// Extend the schema with validation rules
const formSchema = insertContactSubmissionSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().regex(/^\+?[0-9]{10,12}$/, { message: "Invalid phone number" }),
  place: z.string().min(2, { message: "Place must be at least 2 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      place: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      return apiRequest({
        method: 'POST',
        url: '/api/contact',
        body: data
      });
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your message has been sent. We'll contact you shortly.",
        variant: "default",
      });
      form.reset();
      
      // Redirect to WhatsApp with form data
      redirectToWhatsApp(form.getValues());
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const redirectToWhatsApp = (data: FormValues) => {
    const phoneNumber = "917736029821"; // WhatsApp number with country code (no + sign)
    const message = `Hello OLGA Solar, I'm ${data.name} from ${data.place}. I'm interested in your solar products. Please contact me.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Contact Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to switch to solar energy? Get in touch with us today to discuss your requirements and receive a personalized quote.
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-10">
            {/* Contact Information */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-sky-100 p-3 rounded-full text-sky-600 mr-4">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+91 7736029821</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-sky-100 p-3 rounded-full text-sky-600 mr-4">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">info@olgasolar.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-sky-100 p-3 rounded-full text-sky-600 mr-4">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Location</h4>
                      <p className="text-gray-600">
                        OLGA Tower, Solar Street<br />
                        Kochi, Kerala 682001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Working Hours</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday:</span>
                      <span className="font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday:</span>
                      <span className="font-medium">9:00 AM - 2:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sunday:</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-3 bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-8">Send Us a Message</h3>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-5">
                  <div className="relative group">
                    <Input
                      id="name"
                      placeholder="Your Name"
                      {...form.register('name')}
                      className={`w-full h-14 px-6 text-base bg-gray-100 border-none shadow-sm rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${
                        form.formState.errors.name ? 'ring-2 ring-red-400' : ''
                      }`}
                    />
                    {form.formState.errors.name && (
                      <p className="mt-2 ml-6 text-sm text-red-500">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  
                  <div className="relative group">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      {...form.register('email')}
                      className={`w-full h-14 px-6 text-base bg-gray-100 border-none shadow-sm rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${
                        form.formState.errors.email ? 'ring-2 ring-red-400' : ''
                      }`}
                    />
                    {form.formState.errors.email && (
                      <p className="mt-2 ml-6 text-sm text-red-500">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  
                  <div className="relative group">
                    <Input
                      id="phone"
                      placeholder="Phone Number"
                      {...form.register('phone')}
                      className={`w-full h-14 px-6 text-base bg-gray-100 border-none shadow-sm rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${
                        form.formState.errors.phone ? 'ring-2 ring-red-400' : ''
                      }`}
                    />
                    {form.formState.errors.phone && (
                      <p className="mt-2 ml-6 text-sm text-red-500">{form.formState.errors.phone.message}</p>
                    )}
                  </div>
                  
                  <div className="relative group">
                    <Input
                      id="place"
                      placeholder="Your Location"
                      {...form.register('place')}
                      className={`w-full h-14 px-6 text-base bg-gray-100 border-none shadow-sm rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all ${
                        form.formState.errors.place ? 'ring-2 ring-red-400' : ''
                      }`}
                    />
                    {form.formState.errors.place && (
                      <p className="mt-2 ml-6 text-sm text-red-500">{form.formState.errors.place.message}</p>
                    )}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-14 mt-6 bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 text-white font-medium py-2 px-8 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 transition-all duration-300 disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Submitting</span>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">Send Message</span>
                      <Send size={18} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
                
                <p className="text-center text-sm text-gray-500 mt-6">
                  By submitting this form, you'll be redirected to WhatsApp to connect with us directly.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;