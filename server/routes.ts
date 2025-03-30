import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "../shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

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

  // API endpoint to get all contact form submissions for admin dashboard
  app.get("/api/admin/contact-submissions", async (req, res) => {
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
