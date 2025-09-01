import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Box,
  Link,
  Snackbar,
  Alert,
  CircularProgress,
  Stack
} from '@mui/material';
import { Log } from './logger';

const BACKEND_URL = 'http://localhost:5000';

interface IUrlData {
  longUrl: string;
  validity: number;
  shortcode: string;
}

interface IUrlResult {
  shortLink: string;
  expiry: string;
}

// Change this line back to Array(5) as per the instructions
const initialUrlFields: IUrlData[] = Array(5).fill({ longUrl: '', validity: 30, shortcode: '' });

function App() {
  const [urlFields, setUrlFields] = useState<IUrlData[]>(initialUrlFields);
  const [results, setResults] = useState<IUrlResult[]>([]);
  const [statsShortcode, setStatsShortcode] = useState('');
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const list = [...urlFields];
    list[index] = { ...list[index], [name]: value };
    setUrlFields(list);
  };

  const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    let allSucceeded = true;
    for (const urlField of urlFields) {
      if (urlField.longUrl) {
        try {
          await Log("frontend", "info", "api", "Attempting to shorten URL.");
          const response = await axios.post(`${BACKEND_URL}/shorturls`, {
            url: urlField.longUrl,
            validity: urlField.validity,
            shortcode: urlField.shortcode
          });
          setResults(prev => [...prev, response.data]);
          await Log("frontend", "info", "api", "URL shortened successfully.");
        } catch (error: any) {
          allSucceeded = false;
          await Log("frontend", "error", "api", `Shorten failed: ${error.message}`.slice(0, 47));
          console.error("Shortening failed:", error);
        }
      }
    }
    setLoading(false);
    if (allSucceeded) {
      showSnackbar('URLs shortened successfully!', 'success');
    } else {
      showSnackbar('Some URLs failed to shorten.', 'error');
    }
  };

  const handleGetStats = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!statsShortcode) return;
    setLoading(true);
    try {
      await Log("frontend", "info", "api", `Requesting stats for: ${statsShortcode}`);
      const response = await axios.get(`${BACKEND_URL}/shorturls/${statsShortcode}`);
      setStatsData(response.data);
      await Log("frontend", "info", "api", "Stats retrieved successfully.");
      showSnackbar('Statistics retrieved successfully!', 'success');
    } catch (error: any) {
      await Log("frontend", "error", "api", `Stats failed: ${error.message}`.slice(0, 47));
      setStatsData({ error: "Failed to get stats." });
      showSnackbar('Failed to get statistics.', 'error');
      console.error("Stats failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        URL Shortener
      </Typography>

      {/* URL Shortener Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>Shorten URLs</Typography>
        <form onSubmit={handleShorten}>
          <Grid container spacing={2}>
            {urlFields.map((field, index) => (
              <Grid item xs={12} key={index}>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Long URL"
                    name="longUrl"
                    value={field.longUrl}
                    onChange={(e) => handleInputChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                    fullWidth
                    required
                  />
                  <TextField
                    label="Validity (mins)"
                    name="validity"
                    type="number"
                    value={field.validity}
                    onChange={(e) => handleInputChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                    sx={{ width: '150px' }}
                  />
                  <TextField
                    label="Shortcode (optional)"
                    name="shortcode"
                    value={field.shortcode}
                    onChange={(e) => handleInputChange(index, e as React.ChangeEvent<HTMLInputElement>)}
                    sx={{ width: '150px' }}
                  />
                </Stack>
              </Grid>
            ))}
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Shorten'}
          </Button>
        </form>
      </Paper>

      {/* Results Display */}
      {results.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>Shortened Links</Typography>
          {results.map((result, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="body1">
                Original URL: {urlFields[index].longUrl}
              </Typography>
              <Typography variant="body1">
                Short Link: <Link href={result.shortLink} target="_blank" rel="noopener">{result.shortLink}</Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Expires: {new Date(result.expiry).toLocaleString()}
              </Typography>
            </Box>
          ))}
        </Paper>
      )}

      {/* URL Statistics Section */}
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Get Statistics</Typography>
        <form onSubmit={handleGetStats}>
          <Stack direction="row" spacing={2}>
            <TextField
              label="Shortcode"
              value={statsShortcode}
              onChange={(e) => setStatsShortcode(e.target.value)}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Get Stats'}
            </Button>
          </Stack>
        </form>
        {statsData && (
          <Box sx={{ mt: 2 }}>
            {statsData.error ? (
              <Typography color="error">{statsData.error}</Typography>
            ) : (
              <>
                <Typography variant="body1"><strong>Original URL:</strong> {statsData.originalUrl}</Typography>
                <Typography variant="body1"><strong>Total Clicks:</strong> {statsData.totalClicks}</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}><strong>Click Data:</strong></Typography>
                {statsData.clickData.length > 0 ? (
                  statsData.clickData.map((click: any, index: number) => (
                    <Box key={index} sx={{ ml: 2, mb: 1 }}>
                      <Typography variant="body2">Click #{index + 1}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                        Timestamp: {new Date(click.timestamp).toLocaleString()}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                        Source: {click.source || 'N/A'}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ ml: 2 }}>No click data available.</Typography>
                )}
              </>
            )}
          </Box>
        )}
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;