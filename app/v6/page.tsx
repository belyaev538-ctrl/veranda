import { redirect } from "next/navigation";

/** /v6 → основной лендинг (v6 теперь на /) */
export default function V6RedirectPage() {
  redirect("/");
}
