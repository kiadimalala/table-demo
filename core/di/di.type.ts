import { IDeclarationRepository } from "@/core/application/interfaces/repository/declaration-repo.interface";
import { DeclarationUseCase } from "@/core/application/use-cases/declaration/declaration.use-case";
import { DeclarationController } from "@/core/application/controllers/declaration/declaration.controller";

export const SYMBOLS = {
  // repository
  IDeclarationRepository: Symbol.for("IDeclarationRepository"),

  // services
  IAuthService: Symbol.for("IAuthService"),

  // use cases
  DeclarationUseCase: Symbol.for("DeclarationUseCase"),

  // controllers
  DeclarationController: Symbol.for("DeclarationController"),
};

export type DI_TYPES = {
  // repository
  IDeclarationRepository: IDeclarationRepository;

  // use cases
  DeclarationUseCase: DeclarationUseCase;

  // controllers
  DeclarationController: DeclarationController;
};
