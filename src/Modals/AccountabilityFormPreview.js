import React, { useRef, useState } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, Modal, TextField
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

export default function AccountabilityFormPreview({ formData, hardwareData, softwareData, mmcAppData, configData }) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const formRef = useRef();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const generatePdfAndUpload = async () => {
        const element = formRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
    
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
        const pdfBlob = pdf.output('blob');
    
        // Create a reference to Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage, 'pdfs/' + new Date().toISOString() + '.pdf');
        const uploadTask = uploadBytesResumable(storageRef, pdfBlob);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error('Error uploading PDF:', error);
                alert('Error uploading PDF.');
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                const db = getFirestore();
                const docRef = await addDoc(collection(db, 'pdfs'), {
                    email: email,
                    pdfLink: downloadURL,
                    createdAt: new Date(),
                });

                sendEmailWithLink(email, downloadURL);
                alert('PDF uploaded successfully! Email with download link sent.');
            }
        );
        handleClose();
    };  

    const sendEmailWithLink = async (recipientEmail, pdfLink) => {
        try {
            const result = await emailjs.send(
                'service_cnt5bgs',
                'template_nptp19p',
                {
                    from_name: formData.employee,
                    to_email: recipientEmail,
                    link: pdfLink
                },
                '4Wg9vMWzuLUFhTCIL'
            );

            console.log('Email sent successfully:', result.text);
            alert('Email sent successfully!');
        } catch (error) {
            console.error('Email sending failed:', error);
            alert('Failed to send email: ' + error.text);
        }
    };

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
                }}>
                    <Typography variant="h6" mb={2}>Send PDF via Email</Typography>
                    <TextField
                        fullWidth
                        label="Recipient Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={generatePdfAndUpload}
                    >
                        Send
                    </Button>
                </Box>
            </Modal>

            <Box p={4} component={Paper} ref={formRef}>
                <Box mb={2}>
                    <Typography><strong>Employee:</strong> {formData.employee}</Typography>
                    <Typography><strong>Department:</strong> {formData.department}</Typography>
                    <Typography><strong>Employee ID Number:</strong> {formData.employeeId}</Typography>
                    <Typography><strong>Issued By (Requester/Immediate Head):</strong> {formData.issuedBy}</Typography>
                </Box>

                <Typography gutterBottom>
                    I acknowledge receipt of the company-owned equipment listed below. I agree to maintain the equipment/properties
                    in good condition and return it when I cease working for the company, or earlier on request. I promise to report any loss
                    or damage immediately. I am aware that I am held accountable for the loss or damage of any of these properties and may shoulder
                    the cost of these properties under my responsibility. I further agree to use said property only for work-related purposes.
                </Typography>

                {/* Hardware Table */}
                <Typography variant="subtitle1" mt={2}>Hardware/s:</Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Serial/Asset Tag Number</TableCell>
                                <TableCell>Item</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Date Issued</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {hardwareData.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{row.serial}</TableCell>
                                    <TableCell>{row.item}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.status}</TableCell>
                                    <TableCell>{row.dateIssued}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Software Table */}
                <Typography variant="subtitle1" mt={4}>Software/s:</Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Software</TableCell>
                                <TableCell>Installed/Configured</TableCell>
                                <TableCell>Date Installed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {softwareData.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{row.software}</TableCell>
                                    <TableCell>{row.installed}</TableCell>
                                    <TableCell>{row.dateInstalled}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* MMC Apps */}
                <Typography variant="subtitle1" mt={4}>Other MMC App/s:</Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>App</TableCell>
                                <TableCell>Installed/Configured</TableCell>
                                <TableCell>Date Installed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mmcAppData.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{row.software}</TableCell>
                                    <TableCell>{row.installed}</TableCell>
                                    <TableCell>{row.dateInstalled}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Configurations */}
                <Typography variant="subtitle1" mt={4}>Other Configuration/s:</Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Configuration</TableCell>
                                <TableCell>Installed/Configured</TableCell>
                                <TableCell>Date Installed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {configData.map((row, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{row.software}</TableCell>
                                    <TableCell>{row.installed}</TableCell>
                                    <TableCell>{row.dateInstalled}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Signature Section */}
                <Box mt={6} display="flex" justifyContent="space-between">
                    <Box width="45%">
                        <Typography><strong>Signature over Printed Name:</strong></Typography>
                        <Box mt={2} sx={{ borderBottom: '1px solid black', width: '100%', height: '24px' }} />
                    </Box>
                    <Box width="45%">
                        <Typography><strong>Immediate Head:</strong></Typography>
                        <Box mt={2} sx={{ borderBottom: '1px solid black', width: '100%', height: '24px' }} />
                    </Box>
                </Box>

                <Box mt={2} width="45%">
                    <Typography><strong>Date:</strong></Typography>
                    <Box mt={2} sx={{ borderBottom: '1px solid black', width: '100%', height: '24px' }} />
                </Box>
            </Box>
            <Box mt={3} display="flex" justifyContent="flex-end">
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleOpen}>
                    Send as PDF
                </Button>
            </Box>
        </>
    );
}
