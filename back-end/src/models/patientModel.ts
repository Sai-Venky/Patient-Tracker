import { Patient } from '../entities/patient_entity';
import { Medication } from '../entities/medication_entity';
import { Diagnosis } from '../entities/diagnosis_entity';
import { MedicalHistory } from '../entities/medicalhistory_entity';
import { Repository, getManager } from 'typeorm';

/**
 * PatientModel class encapsulates the logic for database operations related to the Patient entity.
 */
export class PatientModel {

  private patientRepository: Repository<Patient>;
  private medicationRepository: Repository<Medication>;
  private diagnosisRepository: Repository<Diagnosis>;
  private medicalHistoryRepository: Repository<MedicalHistory>;

  constructor() {
    // Initialize repositories
    this.patientRepository = getManager().getRepository(Patient);
    this.medicationRepository = getManager().getRepository(Medication);
    this.diagnosisRepository = getManager().getRepository(Diagnosis);
    this.medicalHistoryRepository = getManager().getRepository(MedicalHistory);
  }

  /**
   * Creates a new patient and their related Medications, Diagnoses, and Medical Histories.
   * 
   * @param patientData - Object containing the patient data and related entities data.
   * @returns The saved patient object, including related entities.
   */
  async create(patientData: any) {
    const savedPatient = await this.patientRepository.save(this.patientRepository.create(patientData));

    if (patientData.Medications) {
      for (const med of patientData.Medications) {
        await this.medicationRepository.save(this.medicationRepository.create({ ...med, patient: savedPatient }));
      }
    }

    if (patientData.Diagnoses) {
      for (const diag of patientData.Diagnoses) {
        await this.diagnosisRepository.save(this.diagnosisRepository.create({ ...diag, patient: savedPatient }));
      }
    }

    if (patientData.MedicalHistory) {
      for (const history of patientData.MedicalHistory) {
        await this.medicalHistoryRepository.save(this.medicalHistoryRepository.create({ ...history, patient: savedPatient }));
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
  async update(patientId: string, updateData: any) {
    // Fetch and update the patient
    const patient = await this.patientRepository.findOne({ where: { Patient_ID: patientId } });
    if (!patient) throw new Error('Patient not found');

    this.patientRepository.merge(patient, updateData);
    await this.patientRepository.save(patient);

    // Update related entities similarly to the create method
    await this.clearAndSaveRelatedEntities(patientId, updateData.Medications, this.medicationRepository);
    await this.clearAndSaveRelatedEntities(patientId, updateData.Diagnoses, this.diagnosisRepository);
    await this.clearAndSaveRelatedEntities(patientId, updateData.MedicalHistory, this.medicalHistoryRepository);

    return patient;
  }

  /**
   * Finds and returns all patients.
   * 
   * @returns An array of all patient objects.
   */
  async findAll() {
    return this.patientRepository.find();
  }

  /**
   * Fetches and returns a single patient by their ID, including related entities.
   * 
   * @param patientId - ID of the patient to fetch.
   * @returns The patient object if found, otherwise null.
   */
  async fetchOne(patientId: string) {
    return this.patientRepository.findOne({ 
      where: { Patient_ID: patientId },
      relations: ['medications', 'diagnoses', 'medicalHistory']
    });
  }

  /**
   * Clears and updates related entities for a given patient and entity type.
   * 
   * @param patientId - ID of the patient.
   * @param entities - Array of related entities data.
   * @param repository - Repository for the related entity type.
   */
  private async clearAndSaveRelatedEntities(patientId: string, entities: any[], repository: Repository<any>) {
    await repository.delete({ patient: { Patient_ID: patientId } });
    if (entities) {
      for (const entity of entities) {
        await repository.save(repository.create({ ...entity, patient: { Patient_ID: patientId } }));
      }
    }
  }
}
