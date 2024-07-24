import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { ManageGuestsModal } from "./manage-guests-modal";
import { ConfirmPresenceModal } from "./confirm-presence-modal";
import { useToast } from "../../hooks/useToast";

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
  const { showToast } = useToast();

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

    try {
      const response = await api.post(`/trips/${tripId}/invites`, {
        email,
      });
      const emailsToInvite = response.data;

      setParticipants(emailsToInvite);

      showToast("✅", "E-mail successfully sent.");
      window.document.location.reload();
    } catch (error) {
      showToast(
        "❌",
        "Error when sending the invitation email to a participant."
      );
      console.log(error);
    }
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

    try {
      const response = await api.get(`/participants/${participantId}/confirm`);
      const updatedParticipant = response.data;

      setParticipants(updatedParticipant);

      closeConfirmPresenceModal();

      showToast("✅", "Participant confirmed successfully.");
      window.location.reload();
    } catch (error) {
      showToast("❌", "Error when confirming travel participant.");
      console.log(error);
    }
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
