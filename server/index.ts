import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Dynamic route handler
async function loadRouteHandler(routePath: string) {
  try {
    const handler = await import(routePath);
    return handler.default;
  } catch (error) {
    console.error(`Error loading route handler for ${routePath}:`, error);
    return null;
  }
}

// Dynamic route registration
async function registerRoutes(directory: string, baseRoute: string = '') {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.join(baseRoute, entry.name);

    if (entry.isDirectory()) {
      // Recursively register routes in subdirectories
      await registerRoutes(fullPath, relativePath);
    } else if (entry.name.endsWith('.ts') || entry.name.endsWith('.js')) {
      // Register route handler
      const routePath = relativePath
        .replace(/\.(ts|js)$/, '')
        .replace(/\\/g, '/')
        .replace(/^\/+/, '');

      const handler = await loadRouteHandler(fullPath);
      if (handler) {
        // Handle both GET and POST methods
        app.get(`/api/${routePath}`, async (req, res) => {
          try {
            await handler(req, res);
          } catch (error) {
            console.error(`Error in GET handler for ${routePath}:`, error);
            res.status(500).json({ error: 'Internal server error' });
          }
        });

        app.post(`/api/${routePath}`, async (req, res) => {
          try {
            await handler(req, res);
          } catch (error) {
            console.error(`Error in POST handler for ${routePath}:`, error);
            res.status(500).json({ error: 'Internal server error' });
          }
        });

        console.log(`Registered route: /api/${routePath}`);
      }
    }
  }
}

// Start server
async function startServer() {
  try {
    // Register all routes from the routes directory
    const __filenameNew = fileURLToPath(import.meta.url)
    
    const __dirname= path.dirname(__filenameNew)

    await registerRoutes(path.join(__dirname, 'routes'));
    
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer(); 