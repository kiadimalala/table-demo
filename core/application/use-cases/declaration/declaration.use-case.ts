import { IDeclarationRepository } from "@/core/application/interfaces/repository/declaration-repo.interface";

export class DeclarationUseCase {
  private _declarationRepo: IDeclarationRepository;

  constructor(declarationRepo: IDeclarationRepository) {
    this._declarationRepo = declarationRepo;
  }

  getDeclarationList: IDeclarationRepository["getMany"] = async (queries) => {
    return this._declarationRepo.getMany(queries);
  };

  getDeclarationCount: IDeclarationRepository["getTotalCount"] = async (
    queries
  ) => {
    return this._declarationRepo.getTotalCount(queries);
  };
}
