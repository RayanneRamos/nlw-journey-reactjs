import { Calendar, MapPin, X } from "lucide-react";
import { Button } from "../../components/button";

interface ChangePlaceAndDateModalProps {
  closeChangePlaceAndDateModal: () => void;
}

export function ChangePlaceAndDateModal({
  closeChangePlaceAndDateModal,
}: ChangePlaceAndDateModalProps) {
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
        <form className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <MapPin className="text-zinc-400 size-5" />
            <input
              className="bg-transparent text-lg placeholder:zinc-400 w-40 outline-none flex-1"
              type="text"
              placeholder="Novo local"
              name="destination"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Calendar className="text-zinc-400 size-5" />
              <input
                className="bg-transparent text-lg placeholder:zinc-400 w-40 outline-none flex-1"
                type="text"
                placeholder="Nova data"
                name="date"
              />
            </div>
          </div>
          <Button size="full" variant="primary">
            Salvar as informações
          </Button>
        </form>
      </div>
    </div>
  );
}
