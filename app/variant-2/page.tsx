import { redirect } from "next/navigation";

/** Старый URL → /v2 */
export default function Variant2Redirect() {
  redirect("/v2");
}
