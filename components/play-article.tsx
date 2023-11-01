import { Button } from "@nextui-org/button";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { FC, useState } from "react";
import Waveform from "./waveform";

interface IPlayArticle {
  text: string;
}

const PlayArticle: FC<IPlayArticle> = (props) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const { text } = props;

  const playArticle = () => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    setIsSpeaking(speechSynthesis.speaking);
  };

  const cancelArticle = () => {
    speechSynthesis.cancel();
    setIsSpeaking(speechSynthesis.speaking);
  };

  return (
    <section className="mt-10">
      {isSpeaking ? (
        <div className="flex flex-row gap-3">
          <Button
            aria-label="play"
            color="primary"
            startContent={<AiFillPauseCircle size={20} />}
            endContent={<Waveform />}
            onClick={cancelArticle}
          >
            Stop playing
          </Button>
        </div>
      ) : (
        <Button
          aria-label="play"
          color="primary"
          startContent={<AiFillPlayCircle size={20} />}
          onClick={playArticle}
        >
          Play this article
        </Button>
      )}
    </section>
  );
};

export default PlayArticle;
