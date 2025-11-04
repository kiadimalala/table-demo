import { createModule } from "@evyweb/ioctopus";
import { SYMBOLS } from "@/core/di/di.type";

import { DeclarationUseCase } from "@/core/application/use-cases/user/declartion.use-case";
import { DeclarationController } from "@/core/application/controllers/auth/user.controller";
import { DeclarationRepositoryImpl } from "@/core/infra/repositories/internal/declaration/declaration.repository.impl";

export function createDeclarationModule() {
  const declarationModule = createModule();

  declarationModule
    .bind(SYMBOLS.IDeclarationRepository)
    .toClass(DeclarationRepositoryImpl);
  declarationModule
    .bind(SYMBOLS.DeclarationUseCase)
    .toClass(DeclarationUseCase, [SYMBOLS.IDeclarationRepository]);

  declarationModule
    .bind(SYMBOLS.DeclarationController)
    .toClass(DeclarationController, [SYMBOLS.DeclarationUseCase]);

  return declarationModule;
}
