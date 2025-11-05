import { createContainer } from "@evyweb/ioctopus";
import { DI_TYPES, SYMBOLS } from "@/core/di/di.type";

import { createDeclarationModule } from "@/core/di/modules/declaration.module";

const AppContainer = createContainer();

AppContainer.load(Symbol.for("DeclarationModule"), createDeclarationModule());

export function getInjection<K extends keyof typeof SYMBOLS>(
  symbol: K
): DI_TYPES[K] {
  return AppContainer.get(SYMBOLS[symbol]);
}
