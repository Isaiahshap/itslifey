import { HONEYPOT_FIELD } from "@/lib/form-spam";

type Props = { idPrefix: string };

/**
 * Visually hidden — leave empty.
 * Do not label this as website/url/company (browsers autofill those and
 * silently trip the server honeypot, so real people see success with no email).
 */
export function FormHoneypot({ idPrefix }: Props) {
  const id = `${idPrefix}-hp`;
  return (
    <div className="il-honeypot" aria-hidden="true" inert>
      <label htmlFor={id}>Leave blank</label>
      <input
        id={id}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
        data-lpignore="true"
        data-1p-ignore="true"
        data-bwignore="true"
        data-form-type="other"
      />
    </div>
  );
}
