import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { useToast } from "../../hooks/useToast";

interface RegisterLinkModalProps {
  closeModalRegisterLink: () => void;
}

export function RegisterLinkModal({
  closeModalRegisterLink,
}: RegisterLinkModalProps) {
  const { tripId } = useParams();
  const { showToast } = useToast();

  async function createAnImportantLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    try {
      await api.post(`/trips/${tripId}/links`, {
        title,
        url,
      });

      showToast("✅", "Link successfully registered.");
      window.document.location.reload();
    } catch (error) {
      showToast("❌", "Error creating a link.");
      console.log(error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar link</h2>
            <button type="button" onClick={closeModalRegisterLink}>
              <X className="size-5 text-white" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>
        <form className="space-y-3" onSubmit={createAnImportantLink}>
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              className="bg-transparent text-lg placeholder:zinc-400 w-40 outline-none flex-1"
              type="text"
              placeholder="Título do link"
              name="title"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Link2 className="text-zinc-400 size-5" />
              <input
                className="bg-transparent text-lg placeholder:zinc-400 w-40 outline-none flex-1"
                type="text"
                placeholder="URL"
                name="url"
              />
            </div>
          </div>
          <Button size="full" variant="primary">
            Salvar link
          </Button>
        </form>
      </div>
    </div>
  );
}
