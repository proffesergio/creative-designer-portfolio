#!/usr/bin/env node

/**
 * cPanel Node.js Application Entry Point
 * Compatible with Passenger and cPanel's Node.js Application feature
 */

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

// Import Next.js
let next;
try {
  // Try CommonJS first (for cPanel)
  next = require('next');
} catch (e) {
  console.error('Failed to load Next.js:', e);
  process.exit(1);
}

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// When using middleware, hostname and port must be provided
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // Create HTTP server
  const server = http.createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = url.parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Add security headers
      res.setHeader('X-Powered-By', 'Next.js');

      // Log requests in development
      if (dev) {
        console.log(`${req.method} ${pathname}`);
      }

      // Let Next.js handle the request
      await handle(req, res, parsedUrl);

    } catch (err) {
      console.error('Error handling request:', err);

      // Set error status code
      res.statusCode = 500;

      // Send error response
      res.setHeader('Content-Type', 'text/html');
      res.end('<!DOCTYPE html><html><body><h1>500 - Internal Server Error</h1><p>Something went wrong.</p></body></html>');
    }
  });

  // Handle server errors
  server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });

  // Start the server
  server.listen(port, (err) => {
    if (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }

    console.log(`✅ Next.js server is running on http://${hostname}:${port}`);
    console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);

    // cPanel/Passenger specific: indicate successful startup
    if (process.env.PASSENGER_DEBUG) {
      console.log('Passenger debug mode enabled');
    }
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully...');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });

}).catch((err) => {
  console.error('Failed to start Next.js:', err);
  process.exit(1);
});