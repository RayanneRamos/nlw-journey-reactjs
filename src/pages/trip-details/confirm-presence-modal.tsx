import { Mail, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ConfirmPresenceModalProps {
  closeConfirmPresenceModal: () => void;
  confirmParticipantPresence: (event: FormEvent<HTMLFormElement>) => void;
  setEmailConfirmed: (emailConfirmed: string) => void;
  emailConfirmed: string;
}

interface TripDetailsProps {
  destination: string;
  starts_at: string;
  ends_at: string;
}

export function ConfirmPresenceModal({
  closeConfirmPresenceModal,
  confirmParticipantPresence,
  setEmailConfirmed,
  emailConfirmed,
}: ConfirmPresenceModalProps) {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<TripDetailsProps>();

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const startTripDate = trip?.starts_at ? format(trip.starts_at, "dd") : "";
  const endTripDate = trip?.ends_at ? format(trip.ends_at, "dd") : "";
  const month = trip?.starts_at
    ? format(trip.starts_at, "MMMM", { locale: ptBR })
    : "";
  const year = trip?.starts_at ? format(trip.starts_at, "yyyy") : "";

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
            Você foi convidado(a) para participar de uma viagem para{" "}
            {trip?.destination} nas datas de {startTripDate} a {endTripDate} de{" "}
            {month} de {year}.
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
          <Button type="submit" size="full" variant="primary">
            Confirmar minha presença
          </Button>
        </form>
      </div>
    </div>
  );
}
