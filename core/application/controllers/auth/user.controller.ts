import { DeclarationUseCase } from "@/core/application/use-cases/user/declartion.use-case";

export class DeclarationController {
  private _userUseCase: DeclarationUseCase;

  constructor(userDeclarationCase: DeclarationUseCase) {
    this._userUseCase = userDeclarationCase;
  }
  getDeclarationsList: DeclarationUseCase["getDeclarationList"] = async (
    queries
  ) => {
    return this._userUseCase.getDeclarationList(queries);
  };
}
