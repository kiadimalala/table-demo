// eslint-disable-next-line no-restricted-imports
import fr from "../messages/fr.json";

type Messages = typeof fr;

declare global {
  type IntlMessages = Messages;
}
