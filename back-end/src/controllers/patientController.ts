import { Request, Response } from 'express';
import { PatientModel } from '../models/patientModel';

export class PatientController {

  static async createPatient(req: Request, res: Response): Promise<Response> {
    try {
      const newPatient = await PatientModel.create(req.body);
      return res.status(201).json(newPatient);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getAllPatients(req: Request, res: Response): Promise<Response> {
    try {
      const patients = await PatientModel.findAll();
      return res.status(200).json(patients);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async updatePatient(req: Request, res: Response): Promise<Response> {
    const patientId = req.params.id;
    try {
      const updatedPatient = await PatientModel.update(patientId, req.body);
      return res.status(200).json(updatedPatient);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

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
