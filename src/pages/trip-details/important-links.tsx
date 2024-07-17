import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { RegisterLinkModal } from "./register-link-modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface ImportantLinkProps {
  id: string;
  title: string;
  url: string;
}

export function ImportantLinks() {
  const [isModalRegisterLink, setIsModalRegisterLink] = useState(false);
  const [links, setLinks] = useState<ImportantLinkProps[]>([]);
  const { tripId } = useParams();

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);

  function openModalRegisterLink() {
    setIsModalRegisterLink(true);
  }

  function closeModalRegisterLink() {
    setIsModalRegisterLink(false);
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        {links.map((link) => {
          return (
            <div
              className="flex items-center justify-between gap-4"
              key={link.id}
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href="#"
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                >
                  {link.url}
                </a>
              </div>
              <Link2 className="text-zinc-400 size-5 shrink-0" />
            </div>
          );
        })}
      </div>
      <Button variant="secondary" size="full" onClick={openModalRegisterLink}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isModalRegisterLink && (
        <RegisterLinkModal closeModalRegisterLink={closeModalRegisterLink} />
      )}
    </div>
  );
}
