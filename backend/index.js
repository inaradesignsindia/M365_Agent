const express = require('express');
const cors = require('cors');
const { ConfidentialClientApplication } = require('@azure/msal-node');
const { Client } = require('@microsoft/microsoft-graph-client');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MSAL Configuration
const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID || 'your-client-id',
    clientSecret: process.env.CLIENT_SECRET || 'your-client-secret',
    authority: `https://login.microsoftonline.com/${process.env.TENANT_ID || 'your-tenant-id'}`,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);

app.get('/', (req, res) => {
  res.send('M365 Agent Backend Server');
});

// Route to generate report
app.post('/api/reports/generate', async (req, res) => {
  const { nodes, edges } = req.body;

  // Parse DAG
  const dataSourceNode = nodes.find(n => n.type === 'dataSource');
  const filterNode = nodes.find(n => n.type === 'filter');
  const outputNode = nodes.find(n => n.type === 'output');

  if (!dataSourceNode || !outputNode) {
    return res.status(400).json({ error: 'Invalid DAG: missing data source or output' });
  }

  const dataSource = dataSourceNode.data.label.includes('Users') ? 'users' : 'groups';
  const outputFormat = outputNode.data.label.includes('PDF') ? 'pdf' : 'excel';

  // Build filters
  let filterQuery = '';
  if (filterNode && filterNode.data.filters) {
    const filters = [];
    if (filterNode.data.filters.dateFrom) {
      filters.push(`createdDateTime ge ${filterNode.data.filters.dateFrom.toISOString()}`);
    }
    if (filterNode.data.filters.dateTo) {
      filters.push(`createdDateTime le ${filterNode.data.filters.dateTo.toISOString()}`);
    }
    if (filterNode.data.filters.role) {
      filters.push(`jobTitle eq '${filterNode.data.filters.role}'`);
    }
    if (filters.length) {
      filterQuery = `?$filter=${filters.join(' and ')}`;
    }
  }

  // Fetch data from Graph
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }
  const accessToken = authHeader.substring(7);

  try {
    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    const data = await client.api(`/${dataSource}${filterQuery}`).get();

    // Generate report
    if (outputFormat === 'pdf') {
      const doc = new PDFDocument();
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
        res.send(pdfData);
      });

      doc.fontSize(20).text('Report', { align: 'center' });
      doc.moveDown();

      if (data.value && data.value.length) {
        const keys = Object.keys(data.value[0]);
        doc.fontSize(12);
        data.value.forEach(item => {
          keys.forEach(key => {
            doc.text(`${key}: ${item[key]}`);
          });
          doc.moveDown();
        });
      }

      doc.end();
    } else {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Report');

      if (data.value && data.value.length) {
        const keys = Object.keys(data.value[0]);
        worksheet.addRow(keys);
        data.value.forEach(item => {
          worksheet.addRow(keys.map(key => item[key]));
        });
      }

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

      await workbook.xlsx.write(res);
      res.end();
    }
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
});

// Route to fetch user data using Graph API
app.get('/api/user', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access token required' });
  }

  const accessToken = authHeader.substring(7); // Remove 'Bearer '

  // For validation, we can attempt to use the token with Graph, if it fails, invalid
  // Or use MSAL to validate, but for simplicity, proceed

  try {
    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    const user = await client.api('/me').get();
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});