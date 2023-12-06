import { getRepository } from 'typeorm';
import { Patient } from '../entities/Patient';
import { Medication } from '../entities/Medication';
import { Diagnosis } from '../entities/Diagnosis';
import { MedicalHistory } from '../entities/MedicalHistory';
export class PatientModel {

  static async create(patientData: any) {
    const patientRepository = getRepository(Patient);
    const savedPatient = await patientRepository.save(patientRepository.create(patientData));

    if (patientData.Medications) {
      const medicationRepository = getRepository(Medication);
      for (const med of patientData.Medications) {
        await medicationRepository.save(medicationRepository.create({ ...med, patient: savedPatient }));
      }
    }

    if (patientData.Diagnoses) {
      const diagnosisRepository = getRepository(Diagnosis);
      for (const diag of patientData.Diagnoses) {
        await diagnosisRepository.save(diagnosisRepository.create({ ...diag, patient: savedPatient }));
      }
    }

    if (patientData.MedicalHistory) {
      const medicalHistoryRepository = getRepository(MedicalHistory);
      for (const history of patientData.MedicalHistory) {
        await medicalHistoryRepository.save(medicalHistoryRepository.create({ ...history, patient: savedPatient }));
      }
    }

    return savedPatient;
  }

  static async update(patientId: string, updateData: any) {
    const patientRepository = getRepository(Patient);
    const medicationRepository = getRepository(Medication);
    const diagnosisRepository = getRepository(Diagnosis);
    const medicalHistoryRepository = getRepository(MedicalHistory);

    // Fetch the patient by ID
    const patient = await patientRepository.findOne({ where: { Patient_ID: patientId } });
    if (!patient) {
      throw new Error('Patient not found');
    }
    
    // Update patient's basic information
    patientRepository.merge(patient, updateData);
    await patientRepository.save(patient);

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

  static async findAll() {
    const patientRepository = getRepository(Patient);
    return patientRepository.find();
  }

  static async fetchOne(patientId: string) {
    const patientRepository = getRepository(Patient);
    return patientRepository.findOne({ 
      where: { Patient_ID: patientId },
      relations: ['medications', 'diagnoses', 'medicalHistory']
    });
  }

}
