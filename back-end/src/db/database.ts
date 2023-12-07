import { createConnection } from 'typeorm';
import { Patient } from '../entities/patient_entity';
import { Medication } from '../entities/medication_entity';
import { MedicalHistory } from '../entities/medicalhistory_entity';
import { Diagnosis } from '../entities/diagnosis_entity';
import { Password } from '../entities/password_entity';

/**
 * Initializes and returns a connection to the database using TypeORM.
 * This function is called at the start of the server.
*/
export const initializeDBConnection = async () => {
  return createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'patients',
    entities: [Patient, Medication, MedicalHistory, Diagnosis, Password],
    synchronize: true,
    logging: false,
  });
};
