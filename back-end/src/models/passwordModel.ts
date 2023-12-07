import { getRepository } from 'typeorm'
import { Password } from '../entities/password_entity'

/**
 * PasswordModel class encapsulates the logic for database operations related to the Password entity.
 */
export class PasswordModel {

    static async create(passwordData: any) {
      const passwordRepository = getRepository(Password);
      const savedLogin = await passwordRepository.save(passwordRepository.create(passwordData));
      return savedLogin;
    }
  
    /**
     * Fetches and returns a single patient by their ID, including related entities.
     * 
     * @param patientId - ID of the patient to fetch.
     * @returns The patient object if found, otherwise null.
     */
    static async fetchOne(user_name: string) {
      const passwordRepository = getRepository(Password);
      let res =  await passwordRepository.findOne({ 
        where: { user_name: user_name }
      });
      return res;
    }
  
  }
  