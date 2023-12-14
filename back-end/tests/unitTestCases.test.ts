import { Request, Response } from 'express';
import { PasswordController } from '../src/controllers/PasswordController';
import { PasswordModel } from '../src/models/passwordModel';

// Mock the PasswordModel module
jest.mock('../src/models/passwordModel');

describe('PasswordController', () => {
  // Mock Express Request and Response objects
  const req: Request = {} as Request;
  const res: Response = {} as Response;

  beforeEach(() => {
    // Clear all instances and calls to the mock
    jest.clearAllMocks();
  });

  it('should create a new login successfully', async () => {
    // Mock data for the request body
    const requestBody = {
      user_name: 'newuser',
      password_hash: 'hashedpassword',
    };

    // Mock the fetchOne method to return null (indicating user does not exist)
    (PasswordModel.fetchOne as jest.Mock).mockResolvedValue(null);

    // Mock the create method to return a success message
    (PasswordModel.create as jest.Mock).mockResolvedValue({ message: 'Success' });

    // Set the request body
    req.body = requestBody;

    // Mock response functions
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    // Mock the Express response object
    res.status = statusMock;

    // Call the createLogin method
    await PasswordController.createLogin(req, res);

    // Verify that the mock methods were called with the correct arguments
    expect(PasswordModel.fetchOne).toHaveBeenCalledWith(requestBody.user_name);
    expect(PasswordModel.create).toHaveBeenCalledWith(requestBody);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Success' });
  });

  it('should handle user_name already taken during login creation', async () => {
    // Mock data for the request body
    const requestBody = {
      user_name: 'existinguser',
      password_hash: 'hashedpassword',
    };

    // Mock the fetchOne method to return existing user data
    (PasswordModel.fetchOne as jest.Mock).mockResolvedValue({ user_name: 'existinguser' });

    // Set the request body
    req.body = requestBody;

    // Mock response functions
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });

    // Mock the Express response object
    res.status = statusMock;

    // Call the createLogin method
    await PasswordController.createLogin(req, res);

    // Verify that the mock methods were called with the correct arguments
    expect(PasswordModel.fetchOne).toHaveBeenCalledWith(requestBody.user_name);
    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'User Id Taken' });
    // Ensure that the create method was not called
    expect(PasswordModel.create).not.toHaveBeenCalled();
  });

  it('should handle a user with correct credentials during login', async () => {
    // Mock data for the request body
    const requestBody = {
      user_name: 'existinguser',
      password_hash: 'correctpassword',
    };
  
    // Mock the fetchOne method to return user details
    (PasswordModel.fetchOne as jest.Mock).mockResolvedValue({
      user_name: requestBody.user_name,
      password_hash: 'correctpassword',
    });
  
    // Set the request body
    req.body = requestBody;
  
    // Mock response functions
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });
  
    // Mock the Express response object
    res.status = statusMock;
  
    // Call the login method
    await PasswordController.login(req, res);
  
    // Verify that the mock methods were called with the correct arguments
    expect(PasswordModel.fetchOne).toHaveBeenCalledWith(requestBody.user_name);
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(statusMock).toHaveBeenCalledWith(200);
  });
  
  it('should handle a user with incorrect credentials during login', async () => {
    // Mock data for the request body
    const requestBody = {
      user_name: 'existinguser',
      password_hash: 'incorrectpassword',
    };
  
    // Mock the fetchOne method to return user details
    (PasswordModel.fetchOne as jest.Mock).mockResolvedValue({
      user_name: requestBody.user_name,
      password_hash: 'correctpassword',
    });
  
    // Set the request body
    req.body = requestBody;
  
    // Mock response functions
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });
  
    // Mock the Express response object
    res.status = statusMock;
  
    // Call the login method
    await PasswordController.login(req, res);
  
    // Verify that the mock methods were called with the correct arguments
    expect(PasswordModel.fetchOne).toHaveBeenCalledWith(requestBody.user_name);
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Credentials not found' });
  });

  
  it('should handle an error during login process', async () => {
    // Mock data for the request body
    const requestBody = {
      user_name: 'existinguser',
      password_hash: 'correctpassword',
    };
  
    // Mock the fetchOne method to throw an error
    (PasswordModel.fetchOne as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));
  
    // Set the request body
    req.body = requestBody;
  
    // Mock response functions
    const jsonMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ json: jsonMock });
  
    // Mock the Express response object
    res.status = statusMock;
  
    // Call the login method
    await PasswordController.login(req, res);
  
    // Verify that the mock methods were called with the correct arguments
    expect(PasswordModel.fetchOne).toHaveBeenCalledWith(requestBody.user_name);
    expect(jsonMock).toHaveBeenCalledTimes(1);
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: Error('Internal Server Error')});
  });
});
