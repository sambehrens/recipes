/**
 * Takes classNames as parameters and returns the className to be passed to
 * a component.
 */
export function cx(...classNames: Array<string | undefined | null | false>): string {
  return classNames.filter(Boolean).join(" ");
}
