import { Mail, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";

interface ConfirmPresenceModalProps {
  closeConfirmPresenceModal: () => void;
  confirmParticipantPresence: (event: FormEvent<HTMLFormElement>) => void;
  setEmailConfirmed: (emailConfirmed: string) => void;
  emailConfirmed: string;
}

export function ConfirmPresenceModal({
  closeConfirmPresenceModal,
  confirmParticipantPresence,
  setEmailConfirmed,
  emailConfirmed,
}: ConfirmPresenceModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar participação</h2>
            <button type="button" onClick={closeConfirmPresenceModal}>
              <X className="size-5 text-white" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Você foi convidado(a) para participar de uma viagem para
            Florianópolis, Brasil nas datas de 16 a 27 de Agosto de 2024.
          </p>
          <p className="text-sm text-zinc-400">
            Para confirmar sua presença na viagem, preencha os dados abaixo.
          </p>
        </div>
        <form className="space-y-3" onSubmit={confirmParticipantPresence}>
          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Mail className="text-zinc-400 size-5" />
              <input
                className="bg-transparent text-lg placeholder:zinc-400 w-40 outline-none flex-1"
                type="email"
                placeholder="Seu e-mail"
                name="emailConfirmed"
                value={emailConfirmed}
                onChange={(event) => setEmailConfirmed(event.target.value)}
              />
            </div>
          </div>
          <Button size="full" variant="primary">
            Confirmar minha presença
          </Button>
        </form>
      </div>
    </div>
  );
}
