import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getQueryFn, apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the login form schema
const loginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

// Admin user type
interface AdminUser {
  id: number;
  username: string;
  isAdmin: boolean;
}

// Login response type
interface LoginResponse {
  success: boolean;
  data: AdminUser;
}

// Define the Contact Submission type based on our schema
interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  place: string;
  message: string;
  createdAt: string;
}

// Define the API response type
interface ContactSubmissionResponse {
  success: boolean;
  data: ContactSubmission[];
}

const AdminDashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authHeader, setAuthHeader] = useState<string | null>(null);
  
  // Login form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });
  
  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      return await apiRequest({
        url: '/api/admin/login',
        method: 'POST',
        body: data,
      });
    },
    onSuccess: (data: any) => {
      if (data && data.success) {
        // Create basic auth header
        const authHeader = `Basic ${btoa(`${form.getValues().username}:${form.getValues().password}`)}`;
        setAuthHeader(authHeader);
        setIsAuthenticated(true);
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Handle login form submission
  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };
  
  // Fetch submissions data with auth header
  const { data, isLoading, isError, refetch } = useQuery<ContactSubmissionResponse | null>({
    queryKey: ['/api/admin/contact-submissions'],
    queryFn: async ({ signal }) => {
      if (!isAuthenticated || !authHeader) return null;
      
      const response = await fetch('/api/admin/contact-submissions', {
        headers: {
          'Authorization': authHeader,
        },
        signal,
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          return null;
        }
        throw new Error('Failed to fetch data');
      }
      
      return response.json();
    },
    enabled: isAuthenticated,
  });
  
  const contactSubmissions = data?.data || [];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // Handle any errors
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error loading data",
        description: "Could not load contact submissions. Please try again.",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  // Login form component
  const LoginForm = () => {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-sky-600">OLGA Solar Admin</CardTitle>
            <CardDescription>
              Please login to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  {...form.register("username")}
                />
                {form.formState.errors.username && (
                  <p className="text-sm text-red-500">{form.formState.errors.username.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-sky-600 hover:bg-sky-700"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button variant="link">Back to Homepage</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  };

  // Render login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // Render dashboard if authenticated
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-sky-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">OLGA Solar Admin</h1>
            <p className="text-sky-100">Management Dashboard</p>
          </div>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-sky-700">
                View Website
              </Button>
            </Link>
            <Button 
              className="bg-white text-sky-600 hover:bg-sky-100" 
              onClick={() => refetch()}
            >
              Refresh Data
            </Button>
            <Button 
              variant="destructive"
              onClick={() => {
                setIsAuthenticated(false);
                setAuthHeader(null);
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="submissions" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="submissions">Contact Submissions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="submissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>
                  View and manage all customer inquiries submitted through the contact form.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  // Skeleton loading state
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-full" />
                    {Array(5).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full" />
                    ))}
                  </div>
                ) : contactSubmissions.length === 0 ? (
                  // Empty state
                  <div className="text-center py-12 border rounded-md bg-gray-50">
                    <p className="text-gray-500 mb-4">No submissions yet</p>
                    <p className="text-sm text-gray-400">
                      When customers submit contact forms, they will appear here.
                    </p>
                  </div>
                ) : (
                  // Data table
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableCaption>List of all contact form submissions</TableCaption>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Place</TableHead>
                          <TableHead>Message</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contactSubmissions.map((submission: ContactSubmission) => (
                          <TableRow key={submission.id}>
                            <TableCell className="font-medium">{submission.id}</TableCell>
                            <TableCell>{submission.name}</TableCell>
                            <TableCell>{submission.email}</TableCell>
                            <TableCell>{submission.phone}</TableCell>
                            <TableCell>{submission.place}</TableCell>
                            <TableCell className="max-w-xs truncate">
                              {submission.message}
                            </TableCell>
                            <TableCell>{formatDate(submission.createdAt)}</TableCell>
                            <TableCell>
                              <a 
                                href={`https://wa.me/${submission.phone.replace(/\D/g, '')}?text=Hello ${submission.name}, thank you for contacting OLGA Solar. Regarding your inquiry: "${submission.message?.substring(0, 30) || ''}..."`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                <Button variant="outline" size="sm">
                                  Reply on WhatsApp
                                </Button>
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-gray-500">
                  Total submissions: {contactSubmissions.length}
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  View statistics and analytics for form submissions (Coming soon)
                </CardDescription>
              </CardHeader>
              <CardContent className="min-h-[300px] flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-gray-500 mb-2">
                    Analytics dashboard is coming soon
                  </p>
                  <p className="text-sm text-gray-400">
                    This feature will be available in a future update
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;