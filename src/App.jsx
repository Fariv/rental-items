import * as React from "react";
import { useState } from "react";
import {
  AppBar, Toolbar, Box, Typography, IconButton,
  Menu, MenuItem, Container, Paper, Button,
  Select, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Checkbox, Tabs, Tab,
  TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  Popover
} from "@mui/material";

import BarChartIcon from "@mui/icons-material/BarChart";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SettingsIcon from "@mui/icons-material/Settings";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const resolveIcon = (iconModule) => iconModule?.default ?? iconModule;
const BarChart = resolveIcon(BarChartIcon);
const CameraAlt = resolveIcon(CameraAltIcon);
const KeyboardArrowDown = resolveIcon(KeyboardArrowDownIcon);
const Search = resolveIcon(SearchIcon);
const AccountCircleIcon = resolveIcon(AccountCircle);
const ArrowDownward = resolveIcon(ArrowDownwardIcon);

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
.css-18aone8 {
    margin: 0px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 14px;
}

.css-mp9f0v {
    appearance: none;
    user-select: none;
    cursor: pointer;
    border-radius: 4px;
    font: inherit;
    letter-spacing: inherit;
    color: currentcolor;
    border: 0px;
    box-sizing: content-box;
    background: none;
    height: 34px !important;
    margin: 0px;
    -webkit-tap-highlight-color: transparent;
    display: block;
    min-width: 0px;
    width: 100%;
    animation-name: mui-auto-fill-cancel;
    animation-duration: 10ms;
    padding: 6px 16px;
    line-height: 34px;
}

.css-1pk1fka {
    font: inherit;
    letter-spacing: inherit;
    color: currentcolor;
    border: 0px;
    box-sizing: content-box;
    background: none;
    height: 34px;
    margin: 0px;
    -webkit-tap-highlight-color: transparent;
    display: block;
    min-width: 0px;
    width: 100%;
    animation-name: mui-auto-fill-cancel;
    animation-duration: 10ms;
    padding: 6px 16px;
}

.css-1kw3y0a {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    margin-bottom: 32px;
}

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

/* Popover padding */
.MuiPopover-paper {
  padding: 15px;
}

.css-1vfz60y {
    width: 100%;
    margin-left: auto;
    box-sizing: border-box;
    margin-right: auto;
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 24px;
    padding-bottom: 50px;
}

.css-e42i7k {
    padding: 16px;
    flex: 1 1 0%;
    background: #fff;
}
`;

function Header({ onOpenScanner, onOpenItems }){
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

export default function App(){
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [tab, setTab] = useState(0);
  
  const [rows] = useState(generateItems());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [view, setView] = useState("list");
  const [current, setCurrent] = useState(null);

  // modal state
  const [openFieldsModal, setOpenFieldsModal] = useState(false);
  const [available, setAvailable] = useState(["Size","Weight","Gender","Others"]);
  const [selected, setSelected] = useState(["Item ID","Description","Customer","Item Type","Location","Location Type","Last Scan","Status"]);

  const paged = React.useMemo(() => rows.slice(page*rowsPerPage, page*rowsPerPage + rowsPerPage), [rows, page, rowsPerPage]);

  const openAdd = () => {
    setCurrent({
      gender: "",
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

  if(!isLoggedIn){
    return <MobileLogin onLogin={(role)=>{ setUserRole(role); setIsLoggedIn(true); if(role==='employee'){ setView('scanner'); } }} />;
  }

  if(userRole === 'employee'){
    return <MobileScanner 
      onOpenItem={(id)=>{
        const found = rows.find(r=>r.itemId===id);
        if(found){ setCurrent(found); setView("detail"); }
      }}
      onLogout={()=>{ setIsLoggedIn(false); setUserRole(null); }}
    />;
  }

  if(view === "scanner"){ 
    return <MobileScanner 
      onOpenItem={(id)=>{
        const found = rows.find(r=>r.itemId===id);
        if(found){
          setCurrent(found);
          setView("detail");
        }
      }}
      onLogout={()=>{ setIsLoggedIn(false); setUserRole(null); }}
    />;
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

      <Container maxWidth="xl" sx={{ mt:'15px' }}>
        <Paper sx={{ p:2 }}>
          {/* Header row WITH ACTION BUTTONS */}
          <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:2 }}>
            <Typography sx={{ fontWeight:600 }}>Items</Typography>

            <Box sx={{ display:'flex', gap:1 }}>
              <Button onClick={openAdd} variant="contained" size="small" sx={{ textTransform:'none', fontSize:12, background:'#2a8df0' }}>Add</Button>
              <Button variant="contained" size="small" sx={{ textTransform:'none', fontSize:12, background:'#9e9e9e' }}>Delete</Button>
              <Button variant="contained" size="small" sx={{ textTransform:'none', fontSize:12, background:'#43a047' }}>Export</Button>
            </Box>
          </Box>

          {/* SECOND ROW TOOLBAR */}
          <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:2 }}>

            {/* LEFT */}
            <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
              <Select size="small" value={rowsPerPage} onChange={(e)=>setRowsPerPage(e.target.value)} sx={{ height:30, fontSize:12 }}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
              <Typography sx={{ fontSize:12, color:'#555' }}>out of {rows.length} records</Typography>
            </Box>

            {/* RIGHT */}
            <Box sx={{ display:'flex', alignItems:'center', gap:1.5 }}>

              <Button variant="contained" size="small" sx={{ textTransform:'none', fontSize:12, background:'#2a8df0', boxShadow:'none' }}>{'< Scroll left'}</Button>
              <Button variant="contained" size="small" sx={{ textTransform:'none', fontSize:12, background:'#2a8df0', boxShadow:'none' }}>{'Scroll right >'}</Button>

              <Typography sx={{ color:'#2a8df0', fontSize:12, cursor:'pointer' }}>Σ Sum</Typography>
              <Typography onClick={()=>setOpenFieldsModal(true)} sx={{ color:'#2a8df0', fontSize:12, cursor:'pointer' }}>Show fields with order</Typography>

              <Box sx={{ display:'flex', alignItems:'center', border:'1px solid #cfcfcf', borderRadius:1, overflow:'hidden', height:30 }}>
                <input placeholder="Search text" style={{ border:'none', outline:'none', padding:'0 8px', fontSize:12, width:180 }} />
                <Box sx={{ background:'#2a8df0', width:34, height:'100%', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                  <Search sx={{ color:'#fff', fontSize:16 }} />
                </Box>
              </Box>
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

          {/* Fields Modal */}
          <Dialog open={openFieldsModal} onClose={()=>setOpenFieldsModal(false)} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              Select fields to show in list
              <Button onClick={()=>setOpenFieldsModal(false)}>X</Button>
            </DialogTitle>

            <DialogContent>
              <Box sx={{ display:'flex', gap:2 }}>

                {/* Available */}
                <Box
                  sx={{ flex:1 }}
                  onDragOver={(e)=>e.preventDefault()}
                  onDrop={(e)=>{
                    const field = e.dataTransfer.getData('field');
                    if(selected.includes(field)){
                      setSelected(prev=>prev.filter(f=>f!==field));
                      setAvailable(prev=>[...prev, field]);
                    }
                  }}
                >
                  <Typography sx={{ fontSize:13, mb:1 }}>List of available fields</Typography>
                  <TextField placeholder="Search text" fullWidth size="small" sx={{ mb:1 }} />
                  {available.map((f,i)=>(
                    <Box
                      key={i}
                      draggable
                      onDragStart={(e)=>e.dataTransfer.setData('field', f)}
                      sx={{ display:'flex', alignItems:'center', gap:1, p:1, border:'1px solid #ddd', mb:0.5, fontSize:13, cursor:'grab' }}
                    >
                      <Box sx={{ width:10, height:10, borderRadius:'50%', background:'#cfcfcf' }} />
                      {f}
                    </Box>
                  ))}
                </Box>

                {/* Selected */}
                <Box
                  sx={{ flex:1 }}
                  onDragOver={(e)=>e.preventDefault()}
                  onDrop={(e)=>{
                    const field = e.dataTransfer.getData('field');
                    if(available.includes(field)){
                      setAvailable(prev=>prev.filter(f=>f!==field));
                      setSelected(prev=>[...prev, field]);
                    }
                  }}
                >
                  <Typography sx={{ fontSize:13, mb:1 }}>Selected fields</Typography>
                  <TextField placeholder="Search text" fullWidth size="small" sx={{ mb:1 }} />
                  {selected.map((f,i)=>(
                    <Box
                      key={i}
                      draggable
                      onDragStart={(e)=>e.dataTransfer.setData('field', f)}
                      sx={{ display:'flex', alignItems:'center', gap:1, p:1, border:'1px solid #f0d878', mb:0.5, fontSize:13, background:'#fffbea', cursor:'grab' }}
                    >
                      {f === 'Item Type' ? (
                        <ArrowDownward sx={{ fontSize:16, color:'#2a8df0' }} />
                      ) : (
                        <Box sx={{ width:10, height:10, borderRadius:'50%', background:'#cfcfcf' }} />
                      )}
                      {f}
                    </Box>
                  ))}
                </Box>

              </Box>

              <Box sx={{ textAlign:'center', mt:2, fontSize:12 }}>
                Click ○ To sort ↑↓
              </Box>
            </DialogContent>

            <DialogActions>
              <Button variant="contained" onClick={()=>setOpenFieldsModal(false)}>Save</Button>
              <Button onClick={()=>setOpenFieldsModal(false)}>Reset</Button>
            </DialogActions>
          </Dialog>

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

// ---------------- MOBILE LOGIN ----------------
function MobileLogin({ onLogin }){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('admin');

  return (
    <Box sx={{ background:'#f5f7fa', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>

      {/* Role selector OUTSIDE card */}
      <Box sx={{ width:'100%', maxWidth:380, mb:2 }}>
        <Typography sx={{ fontSize:12, mb:0.5 }}>User role</Typography>
        <Select
          fullWidth
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          sx={{ background:'#fff' }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="employee">Employee</MenuItem>
        </Select>
      </Box>

      {/* Login card */}
      <Box sx={{ width:'100%', maxWidth:380, p:3, background:'#fff', borderRadius:3, boxShadow:3 }}>

        <Typography sx={{ fontSize:20, fontWeight:600, mb:3, textAlign:'center' }}>
          Clarksons Login
        </Typography>

        <Typography sx={{ fontSize:12, mb:0.5 }}>Username</Typography>
        <TextField
          fullWidth
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          sx={{ mb:2 }}
        />

        <Typography sx={{ fontSize:12, mb:0.5 }}>Password</Typography>
        <TextField
          type="password"
          fullWidth
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          sx={{ mb:3 }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ py:1.5, borderRadius:2, background:'#2a8df0' }}
          onClick={()=>onLogin(role)}
        >
          Login
        </Button>

      </Box>
    </Box>
  );
}

// ---------------- DETAIL VIEW ----------------
function Labeled({ label, tip, children }){
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box>
      <Box sx={{ display:'flex', alignItems:'center', gap:0.5, mb:0.5 }}>
        <Typography sx={{ fontSize:12 }}>
          {label}
          {label === 'Item ID' && (
            <span style={{ color:'red', marginLeft:3 }}>*</span>
          )}
        </Typography>
        {tip && (
          <Box
            onClick={handleOpen}
            sx={{
              width:16,
              height:16,
              borderRadius:'50%',
              background:'#e3f2fd',
              color:'#1976d2',
              fontSize:11,
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              cursor:'pointer',
              fontWeight:600
            }}
          >
            i
          </Box>
        )}
      </Box>

      {children}

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx:{
            p:1,
            maxWidth:260,
            fontSize:12,
            border:'1px solid #cfd8dc'
          }
        }}
      >
        <Typography sx={{ fontSize:12, color:'#444' }}>
          {tip}
        </Typography>
      </Popover>
    </Box>
    );
}

function StatusSelect({ value, onChange }){
  const color = value==='Available' ? '#2e7d32' : value==='In Use' ? '#ed6c02' : '#546e7a';
  return (
    <Select
      value={value}
      onChange={onChange}
      fullWidth
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

function ItemDetail({ item, onBack, onOpenScanner }){
  const [form, setForm] = useState(item || {});
  const [tabDetail, setTabDetail] = useState(0);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <Box sx={{ background:'#eef1f5', minHeight:'100vh' }}>
      <style>{styles}</style>
      <Header onOpenScanner={onOpenScanner} onOpenItems={onBack} />

      <Container maxWidth="xl" sx={{ mt:3 }}>
        <Paper sx={{ p:2 }}>

          {/* Top header */}
          <Box sx={{ display:'flex', justifyContent:'space-between', alignItems:'center', mb:2 }}>
            <Box sx={{ display:'flex', alignItems:'center', gap:2 }}>
              <Typography sx={{ fontSize:14 }}>Items ( 1 of 352 )</Typography>
              <Button variant="contained" size="small" onClick={onBack} sx={{ textTransform:'none', background:'#2a8df0' }}>{'< Back'}</Button>
            </Box>
            <Box sx={{ display:'flex', gap:1 }}>
              <Button variant="contained" sx={{ background:'#43a047' }}>Save</Button>
              <Button variant="contained" sx={{ background:'#43a047' }}>Save and next</Button>
              <Button variant="contained" sx={{ background:'#43a047' }}>Save and close</Button>
              <Button variant="contained" sx={{ background:'#2a8df0' }}>Add +</Button>
              <Button variant="contained" sx={{ background:'#9e9e9e' }}>Delete ×</Button>
            </Box>
          </Box>

          {/* FORM GRID */}
          <Box sx={{ display:'grid', gridTemplateColumns:'1fr 1fr 0.7fr 0.7fr 0.7fr 1.6fr 2fr', gap:2 }}>

            {/* Row 1 */}
            <Labeled label="Item ID" tip="Unique identifier used for scanning and tracking this item. This ID is used in QR codes and must be unique.">
              <TextField fullWidth value={form.itemId || ''} />
            </Labeled>

            <Labeled label="Item type" tip="Defines the type of item (e.g. Suit, Life Jacket). Helps categorize and filter items.">
              <Select fullWidth value={form.type || ''} onChange={(e)=>handleChange('type', e.target.value)}>
                {itemTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </Labeled>

            <Labeled label="Size" tip="Physical size of the item. Useful for allocation and fitting purposes.">
              <TextField fullWidth />
            </Labeled>

            <Labeled label="Weight (kg)" tip="Weight of the item in kilograms. Helps with transport and logistics planning.">
              <TextField fullWidth />
            </Labeled>

            <Labeled label="Gender" tip="Indicates if the item is intended for a specific gender. Optional field.">
              <Select
                fullWidth
                value={form.gender || ''}
                onChange={(e)=>handleChange('gender', e.target.value)}
                displayEmpty
                renderValue={(selected) => !selected ? <span style={{ color:'#999' }}>Select</span> : selected}
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </Labeled>

            <Labeled label="Others" tip="Additional attributes or custom details relevant to this item.">
              <TextField fullWidth />
            </Labeled>

            {/* Status + meta */}
            <Box>
              <Labeled label="Status" tip="Current availability of the item. Reflects whether the item is available, in use, or under maintenance.">
                <StatusSelect value={form.status || statuses[0]} onChange={(e)=>handleChange('status', e.target.value)} />
              </Labeled>
              <Typography sx={{ fontSize:12, mt:1 }}>
                Created by John Doe at 13 Apr 2026 14:40<br/>
                Updated by John Doe 24 Apr 2026 15:33
              </Typography>
            </Box>

            {/* Row 2 */}
            <Box sx={{ gridColumn:'span 4' }}>
              <Labeled label="Description" tip="Detailed description of the item to help identify it and provide additional context.">
                <TextField fullWidth multiline rows={3} value={form.description || ''} />
              </Labeled>
            </Box>

            <Box sx={{ gridColumn:'span 2' }}>
              <Labeled label="Customer" tip="Customer associated with this item. Used to track responsibility or assignment.">
                <Select fullWidth value={form.customer || ''} onChange={(e)=>handleChange('customer', e.target.value)}>
                  {customers.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                </Select>
              </Labeled>
            </Box>

            {/* Row 3 (disabled) */}
            <Box sx={{ gridColumn:'span 2' }}>
              <Labeled label="Location" tip="Current location of the item based on the most recent scan. This field is automatically updated via the scanner.">
                <Select fullWidth disabled value={form.location || ''}>
                  {locations.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                </Select>
              </Labeled>
            </Box>

            <Box sx={{ gridColumn:'span 2' }}>
              <Labeled label="Location type" tip="Type of the current location (e.g. Warehouse, Helicopter). Helps group locations logically.">
                <Select fullWidth disabled value={form.locationType || ''}>
                  {locationTypes.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                </Select>
              </Labeled>
            </Box>

            <Box sx={{ gridColumn:'span 2' }}>
              <Labeled label="Last scan" tip="Date and time when the item was last scanned. This determines the latest known location of the item.">
                <TextField fullWidth disabled value={form.lastScan || ''} />
              </Labeled>
            </Box>
          </Box>

          {/* FILES & HISTORY TABS */}
          <Box sx={{ mt:3 }}>
            <Tabs value={tabDetail} onChange={(e,v)=>setTabDetail(v)} sx={{ mb:2 }}>
              <Tab label="Files" />
              <Tab label="History" />
            </Tabs>

            {tabDetail === 0 && (
              <Box>
                <Box sx={{ mb:2 }}>
                  <Labeled label="Category" tip="Category used to classify uploaded files (e.g. Manual, Certificate). Helps organize documents.">
                    <Select
                      size="small"
                      value={""}
                      displayEmpty
                      renderValue={(v)=>{
                        if(!v) return <span style={{color:'#999'}}>Please select</span>;
                        return v;
                      }}
                      sx={{ width: 'calc(100% * 2/7)' }}
                    >
                      <MenuItem value="">Please select</MenuItem>
                      {categories.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
                    </Select>
                  </Labeled>
                </Box>

                <Box sx={{ mb:2 }}>
                  <Labeled label="Description" tip="Short description of the uploaded file for easier identification.">
                    <TextField multiline rows={2} sx={{ width: 'calc(100% * 2/7)' }} />
                  </Labeled>
                </Box>

                <Box className="dropzone">Drag & drop files here or click to upload</Box>

                <Typography className="file-header">Manual</Typography>
                <Box className="file-row">
                  <span>user-manual.pdf — User manual for offshore suit</span>
                  <span>13-04-2026 10:12 | John</span>
                </Box>

                <Typography className="file-header">Certificate</Typography>
                <Box className="file-row">
                  <span>certificate.pdf — Safety compliance certificate</span>
                  <span>14-04-2026 11:20 | John</span>
                </Box>
              </Box>
            )}

            {tabDetail === 1 && (
              <Box sx={{ mt:3 }}>
                <Box className="history-row">
                  <span className="history-time">14:25</span>
                  <span className="history-dot" style={{ background:'#546e7a' }} />
                  <span className="history-text">Location type changed to Warehouse</span>
                </Box>
                <Box className="history-row">
                  <span className="history-time">14:22</span>
                  <span className="history-dot" style={{ background:'#ed6c02' }} />
                  <span className="history-text">Status changed to Available</span>
                </Box>
                <Box className="history-row">
                  <span className="history-time">14:20</span>
                  <span className="history-dot" style={{ background:'#1976d2' }} />
                  <span className="history-text">Customer updated to Total</span>
                </Box>
                <Box className="history-row">
                  <span className="history-time">14:18</span>
                  <span className="history-dot" style={{ background:'#2e7d32' }} />
                  <span className="history-text">SU-011234 item created</span>
                </Box>
              </Box>
            )}
          </Box>

        </Paper>
      </Container>
    </Box>
  );
}

// ---------------- MOBILE SCANNER UI ----------------
export function MobileScanner({ onOpenItem, onBack, onLogout }){
  const [location, setLocation] = useState(locations[0]);
  const [input, setInput] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [toast, setToast] = useState({ open:false, message:"", type:'success' });
  const [lastScanned, setLastScanned] = useState(null);
  const [logs, setLogs] = useState([]); // 🔥 scan log
  const inputRef = React.useRef(null);

  const openMenu = (e)=>setMenuAnchor(e.currentTarget);
  const closeMenu = ()=>setMenuAnchor(null);

  const resetFocus = () => setTimeout(()=> inputRef.current?.focus(), 0);

  // 🔊 success beep
  const playBeep = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(880, ctx.currentTime);
    o.connect(g); g.connect(ctx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.18);
    o.stop(ctx.currentTime + 0.18);
  };

  // 🔊 error beep
  const playErrorBeep = () => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(440, ctx.currentTime);
    o.connect(g); g.connect(ctx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.12);
    o.stop(ctx.currentTime + 0.12);
  };

  const vibrate = (pattern) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  };

  const handleSubmit = () => {
    const normalized = (input || "").trim().toUpperCase();
    const qty = Math.max(1, Number(quantity) || 1);

    if(!normalized){
      playErrorBeep();
      vibrate([60,40,60]);
      setToast({ open:true, type:'error', message:'Invalid scan. Please enter a valid Item ID.' });
      return;
    }

    if(lastScanned === normalized){
      playErrorBeep();
      vibrate([60,40,60]);
      setToast({ open:true, type:'error', message:`Duplicate scan: ${normalized}` });
      setInput("");
      return;
    }

    // ✅ success
    const timestamp = formatDate(new Date());

    playBeep();
    vibrate(60);
    setLastScanned(normalized);

    // 🔥 ADD TO LOG (descending)
    setLogs(prev => [
      { id: normalized, qty, time: timestamp },
      ...prev
    ]);

    setToast({ open:true, type:'success', message:`Added ${normalized} (x${qty}) to ${location}` });
    setInput("");
    setQuantity(1);
    resetFocus();
  };

  const isValid = (input || "").trim().length > 0 && Number(quantity) > 0;

  return (
    <Box sx={{ background:'#f5f7fa', minHeight:'100vh', display:'flex', justifyContent:'center' }}>

      <Box sx={{ width:'100%', maxWidth:420, minHeight:'100vh', background:'#f5f7fa', display:'flex', flexDirection:'column' }}>

        {/* Top bar */}
        <Box sx={{ background:'#fff', px:2, py:1.5, borderBottom:'1px solid #ddd', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <Typography sx={{ fontWeight:600 }}>Scanner</Typography>

          <IconButton onClick={openMenu}>
            <AccountCircleIcon />
          </IconButton>

          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={()=>{ closeMenu(); onLogout && onLogout(); }}>Logout</MenuItem>
          </Menu>
        </Box>

        {/* Content */}
        <Box sx={{ p:2, flex:1, background:'#fff' }}>

          <Typography sx={{ fontSize:12, mb:0.5 }}>Target location</Typography>
          <Select fullWidth value={location} onChange={(e)=>setLocation(e.target.value)} sx={{ mb:2, background:'#fff' }}>
            {locations.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
          </Select>

          <Box sx={{ height:160, border:'1px dashed #ccc', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center', mb:2 }}>
            <Typography sx={{ fontSize:12, color:'#888' }}>Camera preview / continuous scan area</Typography>
          </Box>

          <Typography sx={{ fontSize:12, mb:0.5 }}>Manual input</Typography>
          <Box sx={{ display:'flex', gap:1 }}>
            <TextField
              inputRef={inputRef}
              fullWidth
              autoFocus
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              onKeyDown={(e)=>{ if(e.key==='Enter' && isValid){ handleSubmit(); } }}
              placeholder="Scan QR or type ID"
            />
            <TextField
              type="number"
              inputProps={{ min:1 }}
              value={quantity}
              onChange={(e)=>setQuantity(Math.max(1, Number(e.target.value) || 1))}
              sx={{ width:80 }}
            />
          </Box>

          <Box sx={{ display:'flex', gap:1, mt:2 }}>
            <Button fullWidth disabled={!isValid} variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="outlined" onClick={()=>{ setInput(""); setQuantity(1); resetFocus(); }}>
              Clear
            </Button>
          </Box>

          {/* 🔥 SCAN LOG (1:1 like screenshot) */}
          <Box sx={{ mt:3, borderTop:'1px solid #eee', pt:2 }}>
            <Box sx={{ mb:1 }}>
              <Typography sx={{ fontWeight:600 }}>Scan log</Typography>
            </Box>

            {logs.map((log, i)=> (
              <Box key={i} sx={{ display:'flex', justifyContent:'space-between', py:1, borderBottom:'1px solid #eee' }}>
                <Typography sx={{ fontSize:14 }}>
                  {log.id} (x{log.qty})
                </Typography>
                <Typography sx={{ fontSize:13, color:'#666' }}>
                  {log.time}
                </Typography>
              </Box>
            ))}
          </Box>

        </Box>

        {/* Toast */}
        {toast.open && (
          <Box sx={{ position:'fixed', bottom:80, left:'50%', transform:'translateX(-50%)', width:'90%', maxWidth:380 }}>
            <Box sx={{
              background: toast.type==='success' ? '#d1fae5' : '#fee2e2',
              color: toast.type==='success' ? '#065f46' : '#7f1d1d',
              p:1.5, borderRadius:2, boxShadow:3
            }}>
              {toast.message}
            </Box>
          </Box>
        )}

      </Box>

    </Box>
  );
}
