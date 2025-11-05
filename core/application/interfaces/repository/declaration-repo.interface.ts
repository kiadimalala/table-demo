import { DeclarationModel } from "@/core/domain/models/declaration.model";

export interface IDeclarationRepository {
  getMany(
    queries: FetchQuery<DeclarationModel>
  ): Promise<{ data: DeclarationModel[]; hasMore: boolean }>;
  getTotalCount(queries?: FetchQuery<DeclarationModel>): Promise<number>;
}
