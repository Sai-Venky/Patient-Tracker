import { Request, Response } from 'express';
import { PasswordModel } from '../models/passwordModel';
const crypto = require('crypto')


export class PasswordController {
  
  static async createLogin(req: Request, res: Response): Promise<Response> {
    try {
      
      let already_exists = await PasswordModel.fetchOne(req.body.user_name)
      if(already_exists){
        return res.status(400).json({message:"User Id Taken"})
      }
      const new_login = await PasswordModel.create(req.body);
      return res.status(200).json({message:"Success"});
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }


  static async login(req: Request, res: Response): Promise<Response> {
    const user_name = req.body.user_name;
    const password_input = req.body.password;
    try {
      const user_details = await PasswordModel.fetchOne(user_name);
      let hashPwd = password_input;
      if (user_details?.password_hash != hashPwd) {
        return res.status(404).json({ message: 'Credentials not found' });
      }
      return res.status(200).json();
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
