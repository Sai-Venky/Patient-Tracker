import express from 'express';
import { PatientController } from '../controllers/patientController';
import { PasswordController } from '../controllers/PasswordController';

const router = express.Router();

/**
 * POST /patients
 * Route to create a new patient.
 * It expects patient data in the request body.
 * The actual logic is handled by the PatientController.createPatient method.
 */
router.post('/patients', PatientController.createPatient);

/**
 * GET /patients
 * Route to get all patients.
 * It retrieves a list of all patients from the database.
 * The actual logic is handled by the PatientController.getAllPatients method.
 */
router.get('/patients', PatientController.getAllPatients);

/**
 * PUT /patients/:id
 * Route to update an existing patient.
 * It expects the updated patient data in the request body and patient ID in the URL parameter.
 * The actual logic is handled by the PatientController.updatePatient method.
 */
router.put('/patients/:id', PatientController.updatePatient);

/**
 * GET /patients/:id
 * Route to fetch a single patient by their ID.
 * The patient ID is expected in the URL parameter.
 * The actual logic is handled by the PatientController.getPatient method.
 */
router.get('/patients/:id', PatientController.getPatient);

router.post('/register',PasswordController.createLogin);

router.post('/login',PasswordController.login)

export default router;
