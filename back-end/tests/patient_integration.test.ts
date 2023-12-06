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
        synchronize: true, // use this only in development
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

});
