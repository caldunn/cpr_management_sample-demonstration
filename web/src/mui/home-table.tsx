import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled, Tooltip } from "@mui/material";

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function createRow(client: string, site: string, desc: string, status: status) {
  let randomDateUnix = Math.floor(Math.random() * (Date.now() - (Date.now() - 1000*60*60*24*365)) ) + (Date.now() - 1000*60*60*24*365)
  console.log(randomDateUnix)
  let date = new Date(randomDateUnix);
  let jn = Math.floor(Math.random() * (10000 - 1000) ) + 1000;
  let sh = Math.floor(Math.random() * (10000 - 1000) ) + 1000;

  return { date, jn, sh, client, site, desc, status };
}

enum status {
  ISSUED = "Issued",
  APPROVED = "Approved",
  AWAITING_PARTS = "Awaiting Parts",
  COMPLETE = "Complete"
}
interface Row {
  date: Date;
  jn: number;
  sh: number;
  client: string;
  site: string;
  desc: string;
  status: status;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ jn }) => jn).reduce((sum, i) => sum + i, 0);
}

const rows: Array<Row> = [
  createRow("me-client", "kewdale", "rat ate cable", status.ISSUED),
  createRow("me-client", "kewdale", "rat ate cable", status.AWAITING_PARTS),
  createRow("me-client", "kewdale", "rat ate cable", status.AWAITING_PARTS),
  createRow("me-client", "kewdale", "rat ate cable", status.ISSUED),
  createRow("me-client", "kewdale", "rat ate cable", status.ISSUED),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

const ToolTippedCell = ({toolTip, text}: {toolTip: string, text: string}) => {
  return (
    <Tooltip title={toolTip}><TableCell align="right">{text}</TableCell></Tooltip>
  );
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.primary.contrastText// theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function SpanningTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <ToolTippedCell toolTip={"Job Number"} text={"J/N"} />
            <ToolTippedCell toolTip={"SH Number"} text={"SH"} />
            <ToolTippedCell toolTip={"Client"} text={"Client"} />
            <ToolTippedCell toolTip={"Site Location"} text={"Site"} />
            <ToolTippedCell toolTip={"Description"} text={"Description"} />
            <ToolTippedCell toolTip={"Status"} text={"Status"} />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow onClick={() => console.log(row.jn)} hover key={row.jn}>
              <TableCell>{row.date.toDateString()}</TableCell>
              <TableCell align="right">{row.jn}</TableCell>
              <TableCell align="right">{row.sh}</TableCell>
              <TableCell align="right">{row.client}</TableCell>
              <TableCell align="right">{row.site}</TableCell>
              <TableCell align="right">{row.desc}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </StyledTableRow>
          ))}
          <TableRow >
            <TableCell rowSpan={4} colSpan={4} />
            <TableCell colSpan={2}>Issued</TableCell>
            <TableCell align="right">{rows.filter(row => row.status === status.ISSUED).length}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}>Awaiting Parts</TableCell>
            <TableCell align="right">{rows.filter(row => row.status === status.AWAITING_PARTS).length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{rows.length}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
