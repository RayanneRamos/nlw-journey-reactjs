import { Calendar, MapPin, X } from "lucide-react";
import { Button } from "../../components/button";
import { DateRange, DayPicker } from "react-day-picker";
import { FormEvent, useState } from "react";
import { format } from "date-fns";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface ChangePlaceAndDateModalProps {
  closeChangePlaceAndDateModal: () => void;
  eventStartAndEndDates: DateRange | undefined;
  setEventStartAndEndDates: (dates: DateRange | undefined) => void;
}

export function ChangePlaceAndDateModal({
  closeChangePlaceAndDateModal,
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: ChangePlaceAndDateModalProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [newDestination, setNewDestination] = useState("");
  const { tripId } = useParams();

  function openDatePicker() {
    setIsDatePickerOpen(true);
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false);
  }

  async function updatedLocalAndDateTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const destination = newDestination;
    const starts_at = eventStartAndEndDates?.from;
    const ends_at = eventStartAndEndDates?.to;

    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at,
      ends_at,
    });

    window.location.reload();
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? format(eventStartAndEndDates.from, "d ' de ' LLL")
          .concat(" até ")
          .concat(format(eventStartAndEndDates.to, "d ' de ' LLL"))
      : null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Alterar local e data</h2>
            <button type="button">
              <X
                className="size-5 text-white"
                onClick={closeChangePlaceAndDateModal}
              />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as informações alteradas.
          </p>
        </div>
        <form className="space-y-3" onSubmit={updatedLocalAndDateTrip}>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <MapPin className="text-zinc-400 size-5" />
            <input
              className="bg-transparent text-lg placeholder:zinc-400 w-40 outline-none flex-1"
              type="text"
              placeholder="Novo local"
              name="destination"
              value={newDestination}
              onChange={(event) => setNewDestination(event.target.value)}
            />
          </div>
          <button
            className="flex w-full items-center gap-2"
            onClick={openDatePicker}
          >
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 text-left">
              <Calendar className="text-zinc-400 size-5" />
              <span className="text-lg text-zinc-400 w-40 flex-1">
                {displayedDate || "Qual a nova data?"}
              </span>
            </div>
          </button>
          {isDatePickerOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
              <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Selecione a data</h2>
                    <button type="button" onClick={closeDatePicker}>
                      <X className="size-5 text-white" />
                    </button>
                  </div>
                </div>
                <DayPicker
                  mode="range"
                  selected={eventStartAndEndDates}
                  onSelect={setEventStartAndEndDates}
                />
              </div>
            </div>
          )}
          <Button size="full" variant="primary">
            Salvar as informações
          </Button>
        </form>
      </div>
    </div>
  );
}
