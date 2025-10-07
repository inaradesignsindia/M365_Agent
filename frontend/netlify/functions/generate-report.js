const { Client } = require('@microsoft/microsoft-graph-client');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Access token required' }),
    };
  }
  const accessToken = authHeader.substring(7);

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  const { nodes, edges } = body;

  // Parse DAG
  const dataSourceNode = nodes.find(n => n.type === 'dataSource');
  const filterNode = nodes.find(n => n.type === 'filter');
  const outputNode = nodes.find(n => n.type === 'output');

  if (!dataSourceNode || !outputNode) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid DAG: missing data source or output' }),
    };
  }

  const dataSource = dataSourceNode.data.label.includes('Users') ? 'users' : 'groups';
  const outputFormat = outputNode.data.label.includes('PDF') ? 'pdf' : 'excel';

  // Build filters
  let filterQuery = '';
  if (filterNode && filterNode.data.filters) {
    const filters = [];
    if (filterNode.data.filters.dateFrom) {
      filters.push(`createdDateTime ge ${new Date(filterNode.data.filters.dateFrom).toISOString()}`);
    }
    if (filterNode.data.filters.dateTo) {
      filters.push(`createdDateTime le ${new Date(filterNode.data.filters.dateTo).toISOString()}`);
    }
    if (filterNode.data.filters.role) {
      filters.push(`jobTitle eq '${filterNode.data.filters.role}'`);
    }
    if (filters.length) {
      filterQuery = `?$filter=${filters.join(' and ')}`;
    }
  }

  try {
    const client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });

    const data = await client.api(`/${dataSource}${filterQuery}`).get();

    if (outputFormat === 'pdf') {
      const doc = new PDFDocument();
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=report.pdf',
          },
          body: pdfData.toString('base64'),
          isBase64Encoded: true,
        };
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

      const buffer = await workbook.xlsx.writeBuffer();
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename=report.xlsx',
        },
        body: buffer.toString('base64'),
        isBase64Encoded: true,
      };
    }
  } catch (error) {
    console.error('Error generating report:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to generate report' }),
    };
  }
};