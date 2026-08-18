import { SessionCard } from "./_components/session-card";
import { getSessions } from "./_data-access/get-sessions";

export default async function SessoesPage() {
  const sessions = await getSessions();

  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-4 p-6">
      <h1 className="text-2xl font-bold">Sessões de estudo</h1>
      <div className="flex flex-col gap-4">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </main>
  );
}
