// src/controllers/__tests__/patientController.integration.test.ts

import request from 'supertest';
import { createConnection, getConnection, getRepository } from 'typeorm';
import { Patient } from '../src/entities/patient_entity';
import { Diagnosis } from '../src/entities/diagnosis_entity';
import { MedicalHistory } from '../src/entities/medicalhistory_entity';
import { Medication } from '../src/entities/medication_entity';
import { app } from '../src/index'; // Import your Express app

describe('PatientController Integration Tests', () => {
  beforeAll(async () => {
    await createConnection({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'saivenkatesh',
        password: '',
        database: 'saivenkatesh',
        entities: [Patient, Medication, MedicalHistory, Diagnosis],
        synchronize: true,
        logging: false,
      }); // Uses default connection settings, ideally pointing to a test database
  });

  afterAll(async () => {
    await getConnection().close();
  });

  beforeEach(async () => {
    await getRepository(MedicalHistory).delete({});
    await getRepository(Medication).delete({});
    await getRepository(Diagnosis).delete({});
    await getRepository(Patient).delete({});
  });

  describe('createPatient', () => {
    it('should create a patient in the database', async () => {
      const patientData = {
        Name: "Test Patient",
        Age: 30,
        Email: "test@example.com",
        Phone_Number: "1234567890",
        Address: "123 Test St",
        Emergency_Contact: "Jane Doe"
      };

      const response = await request(app)
        .post('/api/patients')
        .send(patientData);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(patientData);

      const patientRepository = getRepository(Patient);
      const patient = await patientRepository.findOne({ where: { Email: "test@example.com" } });
      expect(patient).toBeDefined();
    });
  });

  describe('updatePatient', () => {
    it('should update a patient in the database', async () => {
      // First, create a patient to update
      let patient = await getRepository(Patient).save({
        Name: "Update Patient",
        Age: 35,
        Email: "update@example.com",
        Phone_Number: 987654321,
        Address: "456 Update St",
        Emergency_Contact: "John Doe"
      });

      const updatedData = {
        Name: "Updated Patient",
        Age: 36,
      };

      const response = await request(app)
        .put(`/api/patients/${patient.Patient_ID}`)
        .send(updatedData);

      expect(response.status).toBe(200);

      // Fetch the updated patient
      const updatedPatient = await getRepository(Patient).findOne({ where: { Patient_ID: patient.Patient_ID } });
      expect(updatedPatient).toBeDefined();
      expect(updatedPatient?.Name).toBe(updatedData.Name);
      expect(updatedPatient?.Age).toBe(updatedData.Age);
    });
  });

  describe('getAllPatients', () => {
    it('should retrieve all patients from the database', async () => {
      // Insert some test patients
      await getRepository(Patient).save([
        { Name: "Patient One", Age: 40, Email: "one@example.com", Phone_Number: 123, Address: "Address One", Emergency_Contact: "Contact One" },
        { Name: "Patient Two", Age: 50, Email: "two@example.com", Phone_Number: 456, Address: "Address Two", Emergency_Contact: "Contact Two" }
      ]);

      const response = await request(app)
        .get('/api/patients');

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('getPatient', () => {
    it('should retrieve a single patient from the database', async () => {
      // First, create a patient to retrieve
      let patient = await getRepository(Patient).save({
        Name: "Single Patient",
        Age: 45,
        Email: "single@example.com",
        Phone_Number: 789,
        Address: "Single Address",
        Emergency_Contact: "Single Contact"
      });

      const response = await request(app)
        .get(`/api/patients/${patient.Patient_ID}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.Patient_ID).toBe(patient.Patient_ID);
    });
  });
});
