import express from 'express';
import { PatientController } from '../controllers/patientController';

const router = express.Router();

// Existing routes for creating and getting all patients
router.post('/patients', PatientController.createPatient);
router.get('/patients', PatientController.getAllPatients);

// New route for updating a patient
router.put('/patients/:id', PatientController.updatePatient);

// New route for fetching a single patient
router.get('/patients/:id', PatientController.getPatient);

export default router;
