import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Import the CSS file here
import App from './App';



// Create a root using the createRoot function
const root = createRoot(document.getElementById('root'));

// Render your application inside the root
root.render(<App />);
