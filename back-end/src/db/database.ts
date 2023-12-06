import { createConnection } from 'typeorm';
import { Patient } from '../entities/Patient';
import { Medication } from '../entities/Medication';
import { MedicalHistory } from '../entities/MedicalHistory';
import { Diagnosis } from '../entities/Diagnosis';

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
