import type { RecipeSectionKind } from "./recipe-section-kind";

export interface RecipeSectionDefinition {
  id: string;
  title: string;
  kind: RecipeSectionKind;
  content: string;
}
