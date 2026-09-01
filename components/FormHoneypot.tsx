import { HONEYPOT_FIELD } from "@/lib/form-spam";

type Props = { idPrefix: string };

/** Visually hidden — leave empty. Bots often fill “website” fields. */
export function FormHoneypot({ idPrefix }: Props) {
  const id = `${idPrefix}-hp`;
  return (
    <div className="il-honeypot" aria-hidden="true">
      <label htmlFor={id}>Company website</label>
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
