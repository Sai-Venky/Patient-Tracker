import { Request, Response } from 'express';
import { PatientController } from '../src/controllers/patientController';
import { PatientModel } from '../src/models/patientModel';

jest.mock('../src/models/patientModel');

describe('PatientController', () => {
    let patientController: PatientController;
    let patientModelMock: jest.Mocked<PatientModel>;
    let req: Request;
    let res: Response;
  
    beforeEach(() => {
      patientModelMock = new PatientModel() as jest.Mocked<PatientModel>;
      patientController = new PatientController(patientModelMock);
      req = {} as Request;
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
    });
  
    describe('createPatient', () => {
      it('should create a new patient and return 201 status', async () => {
        // Arrange
        req.body = { 
            
         };
  
        // Act
        await patientController.createPatient(req, res);
  
        // Assert
        expect(patientModelMock.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
      });
  
      it('should handle errors during patient creation and return 500 status', async () => {
        // Arrange
        req.body = { /* patient data here */ };
        jest.spyOn(patientModelMock, 'create').mockRejectedValue(new Error('Database error'));
  
        // Act
        await patientController.createPatient(req, res);
  
        // Assert
        expect(patientModelMock.create).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: Error('Database error') });
      });
    });
    
    describe('getAllPatients', () => {
        it('should retrieve all patients and return 200 status', async () => {
          // Arrange
          const patientsData = [
            /* ... mock patient data ... */
          ];
          patientModelMock.findAll.mockResolvedValueOnce(patientsData);
    
          // Act
          await patientController.getAllPatients(req, res);
    
          // Assert
          expect(patientModelMock.findAll).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(200);
          expect(res.json).toHaveBeenCalledWith(patientsData);
        });
    
        it('should handle errors during retrieval of all patients and return 500 status', async () => {
          // Arrange
          const errorMessage = 'An error occurred during patient retrieval.';
          patientModelMock.findAll.mockRejectedValueOnce(new Error(errorMessage));
    
          // Act
          await patientController.getAllPatients(req, res);
    
          // Assert
          expect(patientModelMock.findAll).toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
      });
    

  
  });