import { Mail, User, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ConfirmTripModalProps {
  closeConfirmTripModalOpen: () => void;
  createTrip: (event: FormEvent<HTMLFormElement>) => void;
  setOwnerName: (name: string) => void;
  setOwnerEmail: (email: string) => void;
  destination: string;
  eventStartAndEndDates: DateRange | undefined;
}

export function ConfirmTripModal({
  closeConfirmTripModalOpen,
  createTrip,
  setOwnerEmail,
  setOwnerName,
  destination,
  eventStartAndEndDates,
}: ConfirmTripModalProps) {
  const startDay = eventStartAndEndDates?.from
    ? format(eventStartAndEndDates.from, "dd")
    : "";
  const endDay = eventStartAndEndDates?.to
    ? format(eventStartAndEndDates.to, "dd")
    : "";
  const month = eventStartAndEndDates?.to
    ? format(eventStartAndEndDates.to, "MMMM", { locale: ptBR })
    : "";
  const year = eventStartAndEndDates?.to
    ? format(eventStartAndEndDates.to, "yyyy")
    : "";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação de viagem
            </h2>
            <button type="button" onClick={closeConfirmTripModalOpen}>
              <X className="size-5 text-white" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Para concluir a criação daa viagem para{" "}
            <span className="text-zinc-100 font-semibold">{destination}</span>{" "}
            nas datas de{" "}
            <span className="text-zinc-100 font-semibold">
              {startDay} a {endDay} de {month} de {year}{" "}
            </span>
            preencha seus dados abaixo:
          </p>
        </div>
        <form onSubmit={createTrip} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <User className="text-zinc-400 size-5" />
            <input
              className="bg-transparent text-lg placeholder:zinc-400 w-40 outline-none flex-1"
              type="text"
              placeholder="Seu nome completo"
              name="text"
              onChange={(event) => setOwnerName(event.target.value)}
            />
          </div>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Mail className="text-zinc-400 size-5" />
            <input
              className="bg-transparent text-lg placeholder:zinc-400 w-40 outline-none flex-1"
              type="email"
              placeholder="Seu email pessoal"
              name="email"
              onChange={(event) => setOwnerEmail(event.target.value)}
            />
          </div>
          <Button type="submit" size="full" variant="primary">
            Confirmar criação da viagem
          </Button>
        </form>
      </div>
    </div>
  );
}
