import { getRepository } from 'typeorm';
import { Patient } from '../entities/patient_entity';
import { Medication } from '../entities/medication_entity';
import { Diagnosis } from '../entities/diagnosis_entity';
import { MedicalHistory } from '../entities/medicalhistory_entity';

/**
 * PatientModel class encapsulates the logic for database operations related to the Patient entity.
 */
export class PatientModel {

  /**
   * Creates a new patient and their related Medications, Diagnoses, and Medical Histories.
   * 
   * @param patientData - Object containing the patient data and related entities data.
   * @returns The saved patient object, including related entities.
   */
  static async create(patientData: any) {
    const patientRepository = getRepository(Patient);
    const savedPatient = await patientRepository.save(patientRepository.create(patientData));

    // Handle creation of related Medications
    if (patientData.Medications) {
      const medicationRepository = getRepository(Medication);
      for (const med of patientData.Medications) {
        await medicationRepository.save(medicationRepository.create({ ...med, patient: savedPatient }));
      }
    }

    // Handle creation of related Diagnoses
    if (patientData.Diagnoses) {
      const diagnosisRepository = getRepository(Diagnosis);
      for (const diag of patientData.Diagnoses) {
        await diagnosisRepository.save(diagnosisRepository.create({ ...diag, patient: savedPatient }));
      }
    }

    // Handle creation of related Medical Histories
    if (patientData.MedicalHistory) {
      const medicalHistoryRepository = getRepository(MedicalHistory);
      for (const history of patientData.MedicalHistory) {
        await medicalHistoryRepository.save(medicalHistoryRepository.create({ ...history, patient: savedPatient }));
      }
    }

    return savedPatient;
  }

  /**
   * Updates an existing patient and their related entities.
   * 
   * @param patientId - ID of the patient to update.
   * @param updateData - Object containing the updated data for the patient and related entities.
   * @returns The updated patient object.
   */
  static async update(patientId: string, updateData: any) {
    const patientRepository = getRepository(Patient);
    const medicationRepository = getRepository(Medication);
    const diagnosisRepository = getRepository(Diagnosis);
    const medicalHistoryRepository = getRepository(MedicalHistory);

    // Fetch and update the patient
    const patient = await patientRepository.findOne({ where: { Patient_ID: patientId } });
    if (!patient) throw new Error('Patient not found');
    
    patientRepository.merge(patient, updateData);
    await patientRepository.save(patient);

    // Update related entities similarly to the create method
    // Clear and update Medications, Diagnoses, and Medical Histories
        // Clear and update related Medications
        await medicationRepository.delete({ patient: { Patient_ID: patientId } });
        if (updateData.Medications) {
          for (const med of updateData.Medications) {
            await medicationRepository.save(medicationRepository.create({ ...med, patient }));
          }
        }
    
        // Clear and update related Diagnoses
        await diagnosisRepository.delete({ patient: { Patient_ID: patientId } });
        if (updateData.Diagnoses) {
          for (const diag of updateData.Diagnoses) {
            await diagnosisRepository.save(diagnosisRepository.create({ ...diag, patient }));
          }
        }
    
        // Clear and update related Medical Histories
        await medicalHistoryRepository.delete({ patient: { Patient_ID: patientId } });
        if (updateData.MedicalHistory) {
          for (const history of updateData.MedicalHistory) {
            await medicalHistoryRepository.save(medicalHistoryRepository.create({ ...history, patient }));
          }
        }

    return patient;
  }

  /**
   * Finds and returns all patients.
   * 
   * @returns An array of all patient objects.
   */
  static async findAll() {
    const patientRepository = getRepository(Patient);
    return patientRepository.find();
  }

  /**
   * Fetches and returns a single patient by their ID, including related entities.
   * 
   * @param patientId - ID of the patient to fetch.
   * @returns The patient object if found, otherwise null.
   */
  static async fetchOne(patientId: string) {
    const patientRepository = getRepository(Patient);
    return patientRepository.findOne({ 
      where: { Patient_ID: patientId },
      relations: ['medications', 'diagnoses', 'medicalHistory']
    });
  }

}
