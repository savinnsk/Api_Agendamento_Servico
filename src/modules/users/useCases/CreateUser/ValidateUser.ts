import { ICreateUserDTO } from "@modules/users/dto/ICreateUserDTO";

/**
 * class validations basic!
 * not framework
 */
export class ValidateUser {
  readonly user: ICreateUserDTO;

  constructor(user: ICreateUserDTO) {
    this.user = user;
  }

  /**
   *
   * @returns {boolean}
   */
  exec(): boolean {
    // eslint-disable-next-line no-useless-catch
    try {
      return this.isEmail(this.user.email) && this.isName(this.user.name);
    } catch (error) {
      throw error;
    }
  }

  /**
   * check name is valid
   * @param name
   * @return {boolean} TRUE (name is valid) or FALSE
   * example: VALID (Pedro Henrique) NO VALID ( Pedrooohenrique )
   */
  isName(name: string): boolean {
    // eslint-disable-next-line no-useless-catch
    try {
      // eslint-disable-next-line prefer-regex-literals
      if (name.length >= 10 && new RegExp(/^[A-z]+\s{1}[A-z]+\D+/).test(name))
        return true;
      // eslint-disable-next-line no-throw-literal
      throw "Error in validate user name!";
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param email
   * @returns {boolean} TRUE (email is valid) or FALSE
   * example: VALID (email@teste.com) NO VALID ( email.teste.com )
   */
  isEmail(email: string): boolean {
    // eslint-disable-next-line prefer-regex-literals
    if (email.length >= 10 && new RegExp(/^[\S]+@[\S]+\.{1}[A-z]+/).test(email))
      return true;
    // eslint-disable-next-line no-throw-literal
    throw "Error in validate user email!";
  }
}
