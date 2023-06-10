import React, { Component } from 'react'
import UserDetails from './UserDetails';
import Confirmation from './Confirmation';
import PersonalDetails from './PersonalDetails';
import Success from './Success';
import TextEditor from './editor/TextEditor';

export default  class Signup extends Component {
        state = {
                step:1,
                email:'',
                userName:'',
                password:'',
                firstName:'',
                lastName:'',
                country:'',
                highestEducation:'',
                dateOfBirth:'',
                selfDescription:'',
                errors: {}, // Added errors object to track validation errors
        }
        
        prevStep = () => {
                const { step } = this.state;
                this.setState({step:step-1});
        }
        nextStep = () => {
                const{ step } = this.state;
                this.setState({step:step+1});
        }
        

              validateEmail = (email) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
              };
            
              // Validate mobile number format (optional)
              validateMobileNumber = (mobileNumber) => {
                const mobileNumberRegex = /^[0-9]{10}$/;
                return mobileNumberRegex.test(mobileNumber);
              };
            
              // Validate first name and last name (optional)
              validateName = (name) => {
                const nameRegex = /^[a-zA-Z]+$/;
                return nameRegex.test(name);
              };

              validateUserName = (userName) => {
                const userNameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{4,20}$/;
                return userNameRegex.test(userName);
              }

              validatePassword = (password) =>{
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/;
                return passwordRegex.test(password);
              }
              // Update input value and perform validation
              handleChange = (input) => (e) => {
                const value = e.target.value;
                const { errors } = this.state;
            
                // Perform validation based on the input field
                switch (input) {
                  case "email":
                    errors.email = !this.validateEmail(value) ? "Invalid email address" : "";
                    break;
                  case "firstName":
                    errors.firstName = !this.validateName(value)
                      ? "Invalid first name"
                      : "";
                    break;
                    case "userName" :
                      errors.userName = !this.validateUserName(value)
                      ? "Invalid username"
                      : "";
                    break;
                    case "password":
                      errors.password = !this.validatePassword(value)
                      ? "Invalid Password"
                      : "";
                    break;

                    case "lastName":
                    errors.lastName = !this.validateName(value)
                      ? "Invalid last name"
                      : "";
                    break;
                  // Add validation for mobile number if required
                  case "mobileNumber":
                    errors.mobileNumber = !this.validateMobileNumber(value)
                      ? "Invalid mobile number"
                      : "";
                    break;
                  default:
                    break;
                }
            
                this.setState({ [input]: value, errors });
              };
        render() {
               const{ step } = this.state;
               const { email,userName,password,firstName,lastName,country,highestEducation,dateOfBirth,selfDescription,errors} = this.state;
               const values = {email,userName,password,firstName,lastName,country,highestEducation,dateOfBirth,selfDescription}

               switch(step) {
                case 1: 
                 return(
                        <UserDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                        errors={errors}
                        validateForm = {this.validateForm}
                        />
                 )
                 case 2: 
                 return(
                        <PersonalDetails
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                        errors={errors}
                        />
                 )
                case 3 : 
                return(
                  <TextEditor 
                   prevStep={this.prevStep}
                   nextStep={this.nextStep}
                   handleChange={this.handleChange}
                   values={values}
                  />
                )
                 case 4: 
                 return(
                        <Confirmation
                        prevStep={this.prevStep}
                        nextStep={this.nextStep}
                        values={values}
                        />
                 )
                 case 5:
                        return(
                                <Success/>
                        )
                        default:
                                (console.log('This is a multi-step form built with React.'))

               }
              
        }
 
}

      

        
