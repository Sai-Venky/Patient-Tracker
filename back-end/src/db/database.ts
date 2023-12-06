import { createConnection } from 'typeorm';
import { Patient } from '../entities/patient_entity';
import { Medication } from '../entities/medication_entity';
import { MedicalHistory } from '../entities/medicalhistory_entity';
import { Diagnosis } from '../entities/diagnosis_entity';

export const initializeDBConnection = async () => {
  return createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'saivenkatesh',
    password: '',
    database: 'saivenkatesh',
    entities: [Patient, Medication, MedicalHistory, Diagnosis],
    synchronize: true, // use this only in development
    logging: false,
  });
};
