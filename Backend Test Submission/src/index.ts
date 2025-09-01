import express, { Request, Response } from 'express';
import { connectDB } from './db';
import dotenv from 'dotenv';
import cors from 'cors';
import { Log } from '../../Logging Middleware/logger';
import Url from './models/Url';
import shortid from 'shortid';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  console.error("ACCESS_TOKEN is not set in the environment variables.");
  process.exit(1);
}

connectDB();



// --- Redirection Endpoint ---
app.get('/:shortCode', async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;
    const referer = req.get('Referer') || null;

    // Truncate the log message
    await Log("backend", "info", "handler", `Redirection attempt for: ${shortCode}`.slice(0, 47), ACCESS_TOKEN);

    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      await Log("backend", "error", "handler", `Shortcode '${shortCode}' not found.`, ACCESS_TOKEN);
      return res.status(404).send('Short link not found.');
    }

    if (new Date() > urlDoc.expiry) {
      await Log("backend", "warn", "handler", `Shortcode '${shortCode}' has expired.`, ACCESS_TOKEN);
      return res.status(410).send('Short link has expired.');
    }
    
    const newClick = {
      timestamp: new Date(),
      source: referer,
      location: { country: 'IN', city: 'Bengaluru' }
    };

    urlDoc.clicks.push(newClick);
    await urlDoc.save();

    await Log("backend", "info", "handler", `Redirecting '${shortCode}' to long URL.`, ACCESS_TOKEN);
    res.redirect(urlDoc.longUrl);

  } catch (err: any) {
    await Log("backend", "error", "handler", `Redirection failed: ${err.message}`.slice(0, 47), ACCESS_TOKEN);
    res.status(500).send('Internal Server Error');
  }
});

// --- URL Shortener Endpoint ---
app.post('/shorturls', async (req: Request, res: Response) => {
  try {
    const { url, validity, shortcode } = req.body;
    
    await Log("backend", "info", "handler", `Received request to shorten URL: ${url}`.slice(0, 47), ACCESS_TOKEN);

    if (!url) {
      await Log("backend", "error", "handler", "URL is required.", ACCESS_TOKEN);
      return res.status(400).json({ error: 'URL is required.' });
    }

    if (shortcode) {
      const existingUrl = await Url.findOne({ shortCode: shortcode });
      if (existingUrl) {
        await Log("backend", "error", "handler", `Shortcode '${shortcode}' already exists.`, ACCESS_TOKEN);
        return res.status(409).json({ error: 'Custom shortcode already in use.' });
      }
    }

    const validityInMinutes = validity || 30;
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + validityInMinutes);

    const newUrl = new Url({
      longUrl: url,
      shortCode: shortcode || shortid.generate(),
      validity: validityInMinutes,
      expiry: expiryDate,
    });

    await newUrl.save();
    
    await Log("backend", "info", "db", `New short URL created with shortcode: ${newUrl.shortCode}`, ACCESS_TOKEN);

    const shortLink = `${req.protocol}://${req.get('host')}/${newUrl.shortCode}`;
    res.status(201).json({
      shortLink,
      expiry: newUrl.expiry.toISOString()
    });

  } catch (err: any) {
    const errorMessage = `Unexpected error: ${err.message}`.slice(0, 47);
    await Log("backend", "error", "handler", errorMessage, ACCESS_TOKEN);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- Statistics Endpoint ---
app.get('/shorturls/:shortCode', async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params;

    await Log("backend", "info", "handler", `Stats requested for: ${shortCode}`.slice(0, 47), ACCESS_TOKEN);

    const urlDoc = await Url.findOne({ shortCode });

    if (!urlDoc) {
      await Log("backend", "error", "handler", `Stats failed: '${shortCode}' not found.`, ACCESS_TOKEN);
      return res.status(404).json({ error: 'Short link not found.' });
    }
    
    await Log("backend", "info", "handler", `Stats retrieved for: ${shortCode}`, ACCESS_TOKEN);

    res.status(200).json({
      originalUrl: urlDoc.longUrl,
      shortCode: urlDoc.shortCode,
      creationDate: urlDoc.id.getTimestamp(),
      expiryDate: urlDoc.expiry,
      totalClicks: urlDoc.clicks.length,
      clickData: urlDoc.clicks
    });

  } catch (err: any) {
    await Log("backend", "error", "handler", `Stats retrieval failed: ${err.message}`.slice(0, 47), ACCESS_TOKEN);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Frontend Logging Endpoint
app.post('/api/log', async (req: Request, res: Response) => {
  try {
    const { stack, level, packageName, message, accessToken } = req.body;
    await Log(stack, level, packageName, message, accessToken);
    res.status(200).json({ success: true, message: 'Log received and sent.' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to process log request.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});