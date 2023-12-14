import { Request, Response } from 'express';
import { PasswordModel } from '../models/passwordModel';

export class PasswordController {
  
  /**
   * Handles the creation of a new login.
   * 
   * @param req - The Express request object containing user data in the body.
   * @param res - The Express response object.
   * @returns A JSON response indicating success or an error message.
   */
  static async createLogin(req: Request, res: Response): Promise<Response> {
    try {
      // Check if the user with the given user_name already exists
      let alreadyExists = await PasswordModel.fetchOne(req.body.user_name)
      if (alreadyExists) {
        return res.status(400).json({ message: "User Id Taken" });
      }

      // Create a new login
      const newLogin = await PasswordModel.create(req.body);
      return res.status(200).json({ message: "Success" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  /**
   * Handles user login authentication.
   * 
   * @param req - The Express request object containing user data in the body.
   * @param res - The Express response object.
   * @returns A JSON response indicating success or an error message.
   */
  static async login(req: Request, res: Response): Promise<Response> {
    const userName = req.body.user_name;
    const passwordInput = req.body.password_hash;

    try {
      // Fetch user details by user_name
      const userDetails = await PasswordModel.fetchOne(userName);

      // Compare the input password with the stored password_hash
      let hashedPassword = passwordInput;
      if (userDetails?.password_hash !== hashedPassword) {
        return res.status(404).json({ message: 'Credentials not found' });
      }

      // Authentication successful
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
