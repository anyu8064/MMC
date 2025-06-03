import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import SideBar from '../SideNav/SideBar';
import Header from '../Header/Header';
import HardwareTable from '../components/HardwareTable';
import SoftwareTable from '../components/SoftwareTable';
import MmcAppTable from '../components/MmcAppTable';
import ConfigurationTable from '../components/ConfigurationTable';
import AccountabilityFormPreview from '../Modals/AccountabilityFormPreview';

export default function Accountability() {
    const [formData, setFormData] = useState({
        employee: '',
        department: '',
        employeeId: '',
        issuedBy: ''
    });

    const [hardwareData, setHardwareData] = useState([]);
    const [softwareData, setSoftwareData] = useState([]);
    const [mmcData, setMmcData] = useState([]);
    const [configData, setConfigData] = useState([]);
    const [prompt, setPrompt] = useState({
        open: false,
        message: '',
        severity: 'error'
    });


    const [preview, setPreview] = useState(false);

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handlePreviewClick = () => {
        const { employee, department, employeeId, issuedBy } = formData;

        if (!employee || !department || !employeeId || !issuedBy) {
            setPrompt({
                open: true,
                message: 'Please fill in all required fields.',
                severity: 'error'
            });
            return;
        }

        setPreview(true);
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box sx={{ display: 'flex', height: '100vh' }}>
                <SideBar />
            </Box>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', ml: '300px' }}>
                <Box sx={{ height: '10px', flexShrink: 0 }}>
                    <Header title='Accountability Form' />
                </Box>
                <Box sx={{ flexGrow: 1, p: 2, mt: 10, height: 'calc(100vh - 10px)', overflow: 'auto' }}>
                    {!preview ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField fullWidth label='Employee' value={formData.employee} onChange={handleChange('employee')} required={true} />
                            <TextField fullWidth label='Department' value={formData.department} onChange={handleChange('department')} required={true} />
                            <TextField fullWidth label='Employee ID Number' value={formData.employeeId} onChange={handleChange('employeeId')} required={true} />
                            <TextField fullWidth label='Issued By (Requester/Immediate Head)' value={formData.issuedBy} onChange={handleChange('issuedBy')} required={true} />
                            <HardwareTable data={hardwareData} setData={setHardwareData} />
                            <SoftwareTable data={softwareData} setData={setSoftwareData} />
                            <MmcAppTable data={mmcData} setData={setMmcData} />
                            <ConfigurationTable data={configData} setData={setConfigData} />
                            <Button variant="contained" onClick={() => setPreview(true)}>Preview</Button>
                        </Box>
                    ) : (
                        <>
                            <AccountabilityFormPreview 
                                formData={formData}
                                hardwareData={hardwareData}
                                softwareData={softwareData}
                                mmcAppData={mmcData}
                                configData={configData}
                            />
                            <Button variant="outlined" sx={{ mt: -7.5 }} onClick={handlePreviewClick}>Back to Form</Button>
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
