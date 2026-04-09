import { HONEYPOT_FIELD } from "@/lib/form-spam";

type Props = { idPrefix: string };

/** Hidden field — leave empty. Bots often fill “website” fields. */
export function FormHoneypot({ idPrefix }: Props) {
  const id = `${idPrefix}-hp`;
  return (
    <div
      className="pointer-events-none absolute -left-[10000px] top-0 h-px w-px overflow-hidden opacity-0"
      aria-hidden="true"
    >
      <label htmlFor={id} className="sr-only">
        Leave this field blank
      </label>
      <input
        id={id}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}
