import { DeclarationModel } from "@/core/domain/models/declaration.model";

export interface IDeclarationRepository {
  getMany(queries: FetchQuery<DeclarationModel>): Promise<DeclarationModel[]>;
}
