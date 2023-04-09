import { useEffect } from "react";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Title() {
  const [title, setTitle] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setTitle(title + " " + transcript);
  }, [transcript]);

  return (
    <form>
      <div class="form-outline mb-4">
        <input
          type="text"
          onChange={({ target }) => setTitle(target.value)}
          id="form4Example1"
          value={title}
          class="form-control"
        />
        <label class="form-label" for="form4Example1">
          Name
        </label>
        <button type="button" onClick={SpeechRecognition.startListening}>
          Start
        </button>
      </div>
    </form>
  );
}
