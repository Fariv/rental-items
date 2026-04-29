import * as React from "react";
import { useState } from "react";
import {
  AppBar, Toolbar, Typography, Box, Button, IconButton, Container, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Checkbox, Select, MenuItem, TextField, Tabs, Tab, Tooltip, Menu
} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";

const resolveIcon = (iconModule) => iconModule?.default ?? iconModule;
const BarChart = resolveIcon(BarChartIcon);
const CameraAlt = resolveIcon(CameraAltIcon);
const KeyboardArrowDown = resolveIcon(KeyboardArrowDownIcon);
const Search = resolveIcon(SearchIcon);
const AccountCircleIcon = resolveIcon(AccountCircle);

const menuItems = ["PLANNING","JOBS","ITEMS","RENTALS","PROJECTS","PURCHASE","SALES","REPORT","MS DOCS","TABLES","SYSTEM"];
const customers = ["Shell","BP","Total","Chevron","Exxon","Petrobras","Equinor","ENI"];
const itemTypes = ["Suit","Life Jacket","Tool"];
const locations = ["Warehouse NL","Helicopter A","Yard PL"];
const locationTypes = ["Warehouse","Helicopter","Yard"];
const statuses = ["Available","In Use","Maintenance"];
const categories = ["Manual","Certificate","Image","Other"];

function formatDate(d){
  const pad = n => String(n).padStart(2,'0');
  return `${pad(d.getDate())}-${pad(d.getMonth()+1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const generateItems = () => Array.from({ length: 50 }).map((_, i) => ({
  id: i + 1,
  itemId: `SU-${String(11234 + i).padStart(6, "0")}`,
  description: `This is a longer description for item ${i + 1} including additional details about usage, condition and tracking information`,
  customer: customers[Math.floor(Math.random()*customers.length)],
  type: i % 2 === 0 ? "Suit" : "Life Jacket",
  location: i % 2 === 0 ? "Warehouse NL" : "Helicopter A",
  locationType: i % 2 === 0 ? "Warehouse" : "Helicopter",
  lastScan: formatDate(new Date(2026, 0, (i%28)+1, 8+(i%10), (i*3)%60)),
  status: i % 2 === 0 ? "Available" : "In Use",
}));

// custom CSS
const styles = `
.history-row { display:flex; align-items:center; gap:12px; padding:8px 0; }
.history-time { width:60px; font-weight:600; }
.history-dot { width:14px; height:14px; border-radius:50%; display:inline-block; }
.history-text { color:#2c3e50; }

/* RESTORED FILE UI */
.dropzone {
  border: 2px dashed #cfcfcf;
  padding: 24px;
  text-align: center;
  color: #777;
  background: #fafafa;
  border-radius: 4px;
  cursor: pointer;
}
.dropzone:hover {
  background: #f0f4f8;
}
.file-header {
  font-weight: 600;
  margin-top: 12px;
}
.file-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-size: 13px;
}
`;

export function Header({ onOpenScanner, onOpenItems }){
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const submenu = [
    { key:'itemTypes', label:'Item type' },
    { key:'statuses', label:'Item status' },
    { key:'locations', label:'Locations' },
    { key:'locationTypes', label:'Location type' }
  ];

  return (
    <AppBar position="static" elevation={1} sx={{ background:'#eef1f5', color:'#000' }}>
      <Toolbar sx={{ display:'flex', justifyContent:'space-between' }}>
        <Box sx={{ display:'flex', alignItems:'center' }}>
          <Typography sx={{ fontWeight:700, color:'#e53935', mr:1 }}>≋</Typography>
          <Typography sx={{ fontWeight:600, letterSpacing:1 }}>CLARKSONS</Typography>
        </Box>
        <Box sx={{ display:'flex', gap:2 }}>
          {menuItems.map(item => (
            item === "ITEMS" ? (
              <Box
                key={item}
                onClick={handleOpen}
                sx={{ display:'flex', alignItems:'center', fontSize:13, cursor:'pointer' }}
              >
                {item}<KeyboardArrowDown sx={{ fontSize:16, ml:0.3 }}/>
              </Box>
            ) : (
              <Box key={item} sx={{ display:'flex', alignItems:'center', fontSize:13 }}>
                {item}<KeyboardArrowDown sx={{ fontSize:16, ml:0.3 }}/>
              </Box>
            )
          ))}
        </Box>
        <Box sx={{ display:'flex', alignItems:'center' }}>
          <IconButton onClick={onOpenScanner}><CameraAlt/></IconButton>
          <IconButton><BarChart/></IconButton>
          <Typography sx={{ ml:1 }}>Hello <b>John</b></Typography>
        </Box>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
        transformOrigin={{ vertical:'top', horizontal:'left' }}
        PaperProps={{ sx:{ mt:1, width:220 } }}
      >
        {submenu.map(s => (
          <MenuItem
            key={s.key}
            onClick={()=>{ handleClose(); onOpenItems && onOpenItems(s.key); }}
            sx={{ fontSize:'0.9rem' }}
          >
            {s.label}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
}

const App = () => {
  
  const [rows] = useState(generateItems());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [view, setView] = useState("list");
  const [current, setCurrent] = useState(null);

  const paged = React.useMemo(() => rows.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage), [rows, page, rowsPerPage]);

  const openAdd = () => {
    setCurrent({
      itemId: `SU-${String(Math.floor(Math.random()*999999)).padStart(6,'0')}`,
      description: "",
      customer: customers[0],
      type: itemTypes[0],
      location: locations[0],
      locationType: locationTypes[0],
      lastScan: formatDate(new Date()),
      status: statuses[0],
      files: []
    });
    setView("detail");
  };

  const openEdit = (row) => {
    setCurrent({ ...row, files: [] });
    setView("detail");
  };

  if(view === "scanner"){
    return <MobileScanner onOpenItem={(id)=>{
      const found = rows.find(r=>r.itemId===id);
      if(found){
        setCurrent(found);
        setView("detail");
      }
    }} />;
  }

  if(view === "detail"){
    return <ItemDetail 
      item={current} 
      onBack={()=>setView("list")} 
      onOpenScanner={()=>setView("scanner")}
    />;
  }

  return (
    <Box sx={{ background:'#eef1f5', minHeight:'100vh' }}>
      <style>{styles}</style>
      <Header 
        onOpenScanner={()=>setView("scanner")} 
        onOpenItems={()=>setView("list")}
      />

      <Container maxWidth="xl" sx={{ mt:3 }}>
        <Paper sx={{ p:2 }}>
          <Box sx={{ display:'flex', justifyContent:'space-between', mb:2 }}>
            <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
              <Typography variant="h6">Items</Typography>
              <Select size="small" value={rowsPerPage} onChange={(e)=>setRowsPerPage(e.target.value)}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
              <Typography variant="body2">out of {rows.length} records</Typography>
            </Box>
            <Box>
              <Button onClick={openAdd} variant="contained" sx={{ mr:1, background:'#2a8df0' }}>Add</Button>
              <Button variant="contained" color="inherit" sx={{ mr:1 }}>Delete</Button>
              <Button variant="contained" sx={{ background:'#2a8df0' }}>Export</Button>
            </Box>
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ background:'#e9edf2' }}>
                  <TableCell padding="checkbox" sx={{ fontWeight:600 }}><Checkbox/></TableCell>
                  <TableCell sx={{ width:80, fontWeight:600 }}>Item ID</TableCell>
                  <TableCell sx={{ width:200, fontWeight:600 }}>Description</TableCell>
                  <TableCell sx={{ width:140, fontWeight:600 }}>Customer</TableCell>
                  <TableCell sx={{ width:120, fontWeight:600 }}>Item Type</TableCell>
                  <TableCell sx={{ width:140, fontWeight:600 }}>Location</TableCell>
                  <TableCell sx={{ width:130, fontWeight:600 }}>Location Type</TableCell>
                  <TableCell sx={{ width:150, fontWeight:600 }}>Last Scan</TableCell>
                  <TableCell sx={{ width:120, fontWeight:600 }}>Status</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ p: '2px 4px' }}/>
                  {["itemId","description","customer","type","location","locationType","lastScan","status"].map(field => (
                    <TableCell key={field} className="filter-cell" data-source-pos="105:16-126:27" sx={{ p: '1px 2px', minWidth: 0 }}>
                      <Box sx={{ display:'flex', alignItems:'center', border:'1px solid #cfcfcf', height:28, borderRadius:'2px', overflow:'hidden', width:'100%' }}>
                        <input style={{ border:'none', outline:'none', flex:1, fontSize:12, padding:'0 4px', minWidth: 0 }} />
                        <Box sx={{ width:18, height:'100%', display:'flex', alignItems:'center', justifyContent:'center', borderLeft:'1px solid #cfcfcf', background:'#f5f5f5' }}>
                          <Search sx={{ fontSize:15, color:'#666' }}/>
                        </Box>
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {paged.map(row => (
                  <TableRow key={row.id} hover onClick={()=>openEdit(row)} sx={{ cursor:'pointer' }}>
                    <TableCell padding="checkbox"><Checkbox/></TableCell>
                    <TableCell>{row.itemId}</TableCell>
                    <TableCell sx={{ maxWidth:200, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{row.description}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.locationType}</TableCell>
                    <TableCell>{row.lastScan}</TableCell>
                    <TableCell>
                      <Box sx={{ display:'inline-block', px:1.2, py:0.3, borderRadius:1, background: row.status==='Available' ? '#2e7d32' : '#ed6c02', color:'#fff', fontSize:12 }}>
                        {row.status}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display:'flex', justifyContent:'flex-end', alignItems:'center', gap:1, mt:1 }}>
            {(() => {
              const totalPages = Math.ceil(rows.length / rowsPerPage);
              const pages = Array.from({ length: totalPages }, (_, i) => i);
              return (
                <>
                  {pages.map((p) => (
                    <Box key={p} onClick={() => setPage(p)} sx={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: p === page ? '#2a8df0' : 'transparent', color: p === page ? '#fff' : '#2a8df0', fontSize: 14 }}>
                      {p + 1}
                    </Box>
                  ))}
                  <Box onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))} sx={{ cursor: 'pointer', color: '#2a8df0', px: 1 }}>&gt;</Box>
                  <Box onClick={() => setPage(totalPages - 1)} sx={{ cursor: 'pointer', color: '#2a8df0', px: 1 }}>&gt;&gt;</Box>
                </>
              );
            })()}
          </Box>

        </Paper>
      </Container>
    </Box>
  );
}

export default App;

// ---------------- DETAIL VIEW ----------------
function Labeled({ label, tip, children }){
  return (
    <Box>
      <Tooltip title={tip} placement="top-start">
        <Typography sx={{ fontSize:12, mb:0.5, cursor:'help' }}>{label}</Typography>
      </Tooltip>
      {children}
    </Box>
  );
}

function StatusSelect({ value, onChange }){
  const color = value==='Available' ? '#2e7d32' : value==='In Use' ? '#ed6c02' : '#546e7a';
  return (
    <Select value={value} onChange={onChange} fullWidth
      renderValue={(val)=> (
        <Box sx={{ px:1, py:0.3, borderRadius:1, background: color, color:'#fff', display:'inline-block' }}>{val}</Box>
      )}
    >
      {statuses.map(s => (
        <MenuItem key={s} value={s}>
          <Box sx={{ px:1, py:0.3, borderRadius:1, background: s==='Available' ? '#2e7d32' : s==='In Use' ? '#ed6c02' : '#546e7a', color:'#fff' }}>{s}</Box>
        </MenuItem>
      ))}
    </Select>
  );
}

export function ItemDetail({ item, onBack, onOpenScanner }){
  const logs = [
    { time:"08:42", type:"warning", text:"Location type changed to Warehouse" },
    { time:"10:00", type:"success", text:"Last item scanned at 07-01-2026 14:18" },
    { time:"14:37", type:"error", text:"Status changed to \"Available\"" },
    { time:"16:50", type:"info", text:"Customer updated to Total" },
    { time:"21:03", type:"error", text:"SU-011234 item created" },
  ];
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(item);
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState(categories[0]);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files || []).map((f, idx) => ({
      name: f.name || `file_${Date.now()}_${idx}`,
      category,
      date: formatDate(new Date()),
      user: 'John'
    }));
    setFiles(prev => ([...prev, ...newFiles]));
  };

  const grouped = files.reduce((acc, f) => {
    acc[f.category] = acc[f.category] || [];
    acc[f.category].push(f);
    return acc;
  }, {});

  return (
    <Box sx={{ background:'#eef1f5', minHeight:'100vh' }}>
      <style>{styles}</style>
      <Header 
      onOpenScanner={onOpenScanner} 
      onOpenItems={onBack}
    />

      <Container maxWidth="lg" sx={{ mt:3 }}>
        <Paper sx={{ p:2 }}>
          {/* top right back */}
          <Box sx={{ display:'flex', justifyContent:'flex-end' }}>
            <Button onClick={onBack}>Back</Button>
          </Box>

          <Typography variant="h6" sx={{ mb:2 }}>Item Detail</Typography>

          <Tabs value={tab} onChange={(e,v)=>setTab(v)}>
            <Tab label="General" />
            <Tab label="Files" />
            <Tab label="History" />
          </Tabs>

          {tab === 0 && (
            <Box sx={{ mt:2, display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
              <Labeled label="Item ID" tip="Unique identifier with SU- prefix">
                <TextField value={form.itemId} fullWidth />
              </Labeled>

              <Labeled label="Customer" tip="Select related customer">
                <Select value={form.customer} onChange={(e)=>handleChange('customer', e.target.value)} fullWidth>
                  {customers.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
              </Labeled>

              <Labeled label="Description" tip="Detailed description">
                <TextField value={form.description} multiline rows={3} fullWidth sx={{ gridColumn:'span 2' }} />
              </Labeled>

              <Labeled label="Item Type" tip="Type of item">
                <Select value={form.type} onChange={(e)=>handleChange('type', e.target.value)} fullWidth>
                  {itemTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                </Select>
              </Labeled>

              <Labeled label="Location" tip="Current location">
                <Select value={form.location} onChange={(e)=>handleChange('location', e.target.value)} fullWidth>
                  {locations.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                </Select>
              </Labeled>

              <Labeled label="Location Type" tip="Type of location">
                <Select value={form.locationType} onChange={(e)=>handleChange('locationType', e.target.value)} fullWidth>
                  {locationTypes.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                </Select>
              </Labeled>

              <Labeled label="Last Scan" tip="Last scanned date/time">
                <TextField value={form.lastScan} fullWidth />
              </Labeled>

              <Labeled label="Status" tip="Current item status">
                <StatusSelect value={form.status} onChange={(e)=>handleChange('status', e.target.value)} />
              </Labeled>
            </Box>
          )}

          {tab === 1 && (
            <Box sx={{ mt:2 }}>
              <Box sx={{ display:'flex', gap:2, mb:2 }}>
                <Select value={category} onChange={(e)=>setCategory(e.target.value)}>
                  {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
                <Typography sx={{ alignSelf:'center' }}>Select category before upload</Typography>
              </Box>

              <Box className="dropzone"
                onDragOver={(e)=>e.preventDefault()}
                onDrop={handleDrop}
              >
                Drag & Drop files here (by category)
              </Box>

              {Object.keys(grouped).map(cat => (
                <Box key={cat}>
                  <Typography className="file-header">{cat}</Typography>
                  {grouped[cat].map((f,i)=> (
                    <Box key={i} className="file-row">
                      <a href="#">{f.name}</a>
                      <span>{f.date}</span>
                      <span>{f.user}</span>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          )}

          {tab === 2 && (
            <Box sx={{ mt:2 }}>
              {logs.map((log, i) => {
                const color = log.type === 'success' ? '#2e7d32' : log.type === 'error' ? '#e53935' : log.type === 'warning' ? '#f9a825' : '#1976d2';
                return (
                  <Box key={i} className="history-row">
                    <Box className="history-time">{log.time}</Box>
                    <Box className="history-dot" sx={{ border:`3px solid ${color}` }} />
                    <Box className="history-text">{log.text}</Box>
                  </Box>
                );
              })}
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
}


// ---------------- MOBILE SCANNER UI ----------------
export function MobileScanner({ onOpenItem, onBack }){
  const [location, setLocation] = useState(locations[0]);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([]);
  const [toast, setToast] = useState({ open:false, message:"" });

  const handleScan = (value) => {
    const normalized = value?.toUpperCase();
    if(!normalized) return;

    if(logs.find(l => l.id === normalized)){
      setLogs(prev => ([
        { type:"error", message:"Error: Duplicate scan detected." },
        ...prev
      ]));
    } else {
      const message = `Success: Item ${normalized} added successfully to location ${location}.`;
      setLogs(prev => ([
        { type:"success", id:normalized, location },
        ...prev
      ]));
      setToast({ open:true, message });
    }

    setInput("");
  };

  return (
    <Box sx={{ background:'#0b1220', minHeight:'100vh', display:'flex', justifyContent:'center' }}>

      {/* Mobile frame */}
      <Box sx={{ width:'100%', maxWidth:420, minHeight:'100vh', color:'#fff', background:'#0b1220', boxShadow:'0 0 0 1px #1f2937', display:'flex', flexDirection:'column' }}>

        {/* Top bar */}
        <Box sx={{ position:'sticky', top:0, zIndex:10, background:'#0b1220', px:2, py:1.5, borderBottom:'1px solid #1f2937', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <Typography sx={{ fontWeight:600 }}>Scanner</Typography>
          <IconButton sx={{ color:'#cbd5e1' }}>
            <AccountCircleIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p:2, flex:1 }}>

          {/* Location */}
          <Typography sx={{ fontSize:12, color:'#94a3b8', mb:0.5 }}>Target location</Typography>
          <Select
            fullWidth
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
            sx={{ mb:2, background:'#111827', color:'#fff', borderRadius:2 }}
          >
            {locations.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
          </Select>

          {/* Camera preview placeholder */}
          <Box sx={{ height:180, borderRadius:3, background:'#020617', border:'1px dashed #334155', display:'flex', alignItems:'center', justifyContent:'center', mb:2 }}>
            <Typography sx={{ color:'#64748b', fontSize:12 }}>Camera preview / continuous scan area</Typography>
          </Box>

          {/* Manual input */}
          <Typography sx={{ fontSize:12, color:'#94a3b8', mb:0.5 }}>Manual input</Typography>
          <TextField
            fullWidth
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            onKeyDown={(e)=> e.key === 'Enter' && handleScan(input)}
            placeholder="Scan QR or type ID"
            sx={{ background:'#111827', borderRadius:2, input:{ color:'#fff' } }}
          />

          {/* Logs */}
          <Box sx={{ mt:3 }}>
            {logs.map((log, i)=> (
              <Box key={i}
                sx={{
                  p:1.5,
                  mb:1,
                  borderRadius:3,
                  background: log.type === 'success' ? '#052e16' : '#450a0a',
                  border: log.type === 'success' ? '1px solid #166534' : '1px solid #7f1d1d',
                  fontSize:13
                }}
              >
                {log.type === 'success' ? (
                  <>
                    Success: Item{' '}
                    <span
                      style={{ textDecoration:'underline', cursor:'pointer', color:'#93c5fd' }}
                      onClick={()=>onOpenItem && onOpenItem(log.id)}
                    >
                      {log.id}
                    </span>
                    {` added successfully to location ${log.location}.`}
                  </>
                ) : (
                  log.message
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Sticky bottom scan bar */}
        <Box sx={{ p:2, borderTop:'1px solid #1f2937' }}>
          <Button fullWidth size="large" variant="contained" sx={{ py:1.5, borderRadius:3 }} onClick={()=>handleScan(input)}>
            Scan
          </Button>
        </Box>

      </Box> {/* close mobile frame */}

      {/* Success Popup */}
      {toast.open && (
        <Box sx={{ position:'fixed', bottom:80, left:'50%', transform:'translateX(-50%)', width:'90%', maxWidth:380 }}>
          <Box sx={{ background:'#d1fae5', color:'#065f46', p:1.5, borderRadius:2, boxShadow:3 }}>
            {toast.message}
          </Box>
        </Box>
      )}

    </Box>
  );
}
