import { redirect } from "@remix-run/node";
export async function loader() {
  return redirect("/wizard");
}
export default function Index() {
  return null;
}
