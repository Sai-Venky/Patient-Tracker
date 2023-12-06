import { Request, Response } from 'express';
import { PatientModel } from '../models/patientModel';

/**
 * PatientController is called by the patient routes and interacts with the Patient and related models.
*/
export class PatientController {
  
  /**
   * Handles the creation of a new patient.
   * 
   * @param req - The Express request object containing patient data in the body.
   * @param res - The Express response object.
   * @returns A JSON response with the created patient or an error message.
   */
  static async createPatient(req: Request, res: Response): Promise<Response> {
    try {
      const newPatient = await PatientModel.create(req.body);
      return res.status(201).json(newPatient);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  /**
   * Retrieves all patients from the database.
   * 
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @returns A JSON response with an array of all patients or an error message.
   */
  static async getAllPatients(req: Request, res: Response): Promise<Response> {
    try {
      const patients = await PatientModel.findAll();
      return res.status(200).json(patients);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  /**
   * Updates the data of an existing patient.
   * 
   * @param req - The Express request object with patient ID in the URL parameters and update data in the body.
   * @param res - The Express response object.
   * @returns A JSON response with the updated patient or an error message.
   */
  static async updatePatient(req: Request, res: Response): Promise<Response> {
    const patientId = req.params.id;
    try {
      const updatedPatient = await PatientModel.update(patientId, req.body);
      return res.status(200).json(updatedPatient);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  /**
   * Retrieves a single patient by their ID.
   * 
   * @param req - The Express request object with patient ID in the URL parameters.
   * @param res - The Express response object.
   * @returns A JSON response with the patient data or a not found/error message.
   */
  static async getPatient(req: Request, res: Response): Promise<Response> {
    const patientId = req.params.id;
    try {
      const patient = await PatientModel.fetchOne(patientId);
      if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      return res.status(200).json(patient);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

}
