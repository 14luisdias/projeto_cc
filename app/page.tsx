import { redirect } from "next/navigation";

export default function Home() {
  // Única feature do MVP por enquanto: sessões de estudo.
  redirect("/sessoes");
}
