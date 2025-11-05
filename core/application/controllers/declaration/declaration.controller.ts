import { DeclarationUseCase } from "@/core/application/use-cases/declaration/declaration.use-case";

export class DeclarationController {
  private _declarationUseCase: DeclarationUseCase;

  constructor(declarationDeclarationCase: DeclarationUseCase) {
    this._declarationUseCase = declarationDeclarationCase;
  }
  getDeclarationsList: DeclarationUseCase["getDeclarationList"] = async (
    queries
  ) => {
    return this._declarationUseCase.getDeclarationList(queries);
  };

  getDeclarationCount: DeclarationUseCase["getDeclarationCount"] = async (
    queries
  ) => {
    return this._declarationUseCase.getDeclarationCount(queries);
  };
}
