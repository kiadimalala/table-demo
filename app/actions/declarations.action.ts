"use server";

import { getInjection } from "@/core/di/container";
import { DeclarationModel } from "@/core/domain/models/declaration.model";
import { unstable_cache } from "next/cache";
import { handleActionError, mapActionResponse } from "@/app/lib/utils";

const declarationController = getInjection("DeclarationController");

export const getDeclarationList = unstable_cache(
  async (queries?: FetchQuery<DeclarationModel>) => {
    try {
      const declarations = await declarationController.getDeclarationsList(
        queries!
      );

      return mapActionResponse(declarations);
    } catch (error) {
      console.log(error);

      return handleActionError(error as Error);
    }
  },
  undefined,
  { tags: ["declarations"] }
);
