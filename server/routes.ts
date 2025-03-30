import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "../shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";

// Admin login schema
const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

// Admin authentication middleware
const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({
      success: false,
      message: "Authentication required"
    });
  }

  try {
    // Decode Basic Auth credentials
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');
    
    // Verify admin credentials
    const user = await storage.verifyAdminUser(username, password);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
    
    // Add user to request for potential later use
    (req as any).user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed"
    });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to store contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate form data using zod schema
      const contactData = insertContactSubmissionSchema.parse(req.body);
      
      // Store form submission in memory storage
      await storage.saveContactSubmission(contactData);
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        message: "Contact form submitted successfully" 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to submit contact form" 
        });
      }
    }
  });

  // API endpoint for admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      // Validate login data
      const loginData = loginSchema.parse(req.body);
      
      // Verify admin credentials
      const user = await storage.verifyAdminUser(loginData.username, loginData.password);
      
      if (user) {
        // Return success with basic information (no password)
        res.status(200).json({
          success: true,
          data: {
            id: user.id,
            username: user.username,
            isAdmin: user.isAdmin
          }
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid credentials"
        });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Login failed"
        });
      }
    }
  });

  // API endpoint to get all contact form submissions for admin dashboard (protected route)
  app.get("/api/admin/contact-submissions", authenticateAdmin, async (req, res) => {
    try {
      const submissions = await storage.getAllContactSubmissions();
      res.status(200).json({
        success: true,
        data: submissions
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch contact submissions"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
