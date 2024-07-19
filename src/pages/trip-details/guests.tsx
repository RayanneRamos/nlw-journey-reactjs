import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { ManageGuestsModal } from "./manage-guests-modal";
import { ConfirmPresenceModal } from "./confirm-presence-modal";

export interface ParticipantsProps {
  id: string;
  name: string | null;
  email: string;
  is_confirmed: boolean;
}

export function Guests() {
  const { tripId } = useParams();
  const [participants, setParticipants] = useState<ParticipantsProps[]>([]);
  const [confirmPresenceModal, setConfirmPresenceModal] = useState(false);
  const [manageGuestsModal, setManageGuestsModal] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState("");

  useEffect(() => {
    api
      .get(`/trips/${tripId}/participants`)
      .then((response) => setParticipants(response.data.participants));
  }, [tripId]);

  function openManageGuestsModal() {
    setManageGuestsModal(true);
  }

  function closeManageGuestsModal() {
    setManageGuestsModal(false);
  }

  function openConfirmPresenceModal() {
    setConfirmPresenceModal(true);
  }

  function closeConfirmPresenceModal() {
    setConfirmPresenceModal(false);
  }

  async function emailToInviteNewPeople(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get("email")?.toString();

    if (!email) {
      return;
    }

    const response = await api.post(`/trips/${tripId}/invites`, {
      email,
    });
    const emailsToInvite = response.data;

    console.log(emailsToInvite);

    setParticipants(emailsToInvite);

    window.location.reload();
  }

  function getParticipantByEmail(email: string) {
    const participant = participants.find(
      (participant) => participant.email === email
    );
    return participant?.id;
  }

  async function confirmParticipantPresence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const emailConfirmed = data.get("emailConfirmed")?.toString();

    if (!emailConfirmed) {
      return;
    }

    const participantId = getParticipantByEmail(emailConfirmed);

    const response = await api.patch(`/participants/${participantId}/confirm`);
    const updatedParticipant = response.data;

    setParticipants(updatedParticipant);

    window.location.reload();
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <div
              className="flex items-center justify-between gap-4"
              key={participant.id}
            >
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {participant.name ?? `Convidado ${index}`}
                </span>
                <span className="block text-sm text-zinc-400 truncate">
                  {participant.email}
                </span>
              </div>
              {participant.is_confirmed ? (
                <CheckCircle2 className="text-green-400 size-5 shrink-0" />
              ) : (
                <button onClick={openConfirmPresenceModal}>
                  <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                </button>
              )}
            </div>
          );
        })}
      </div>
      <Button variant="secondary" size="full" onClick={openManageGuestsModal}>
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {manageGuestsModal && (
        <ManageGuestsModal
          closeManageGuestsModal={closeManageGuestsModal}
          emailToInviteNewPeople={emailToInviteNewPeople}
        />
      )}

      {confirmPresenceModal && (
        <ConfirmPresenceModal
          closeConfirmPresenceModal={closeConfirmPresenceModal}
          confirmParticipantPresence={confirmParticipantPresence}
          setEmailConfirmed={setEmailConfirmed}
          emailConfirmed={emailConfirmed}
        />
      )}
    </div>
  );
}
