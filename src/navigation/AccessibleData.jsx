export default function AccessibleData() {
  const location = 'Fiterman Hall (245 Greenwich St)';
  const doorType = 'Double';
  const doorKnob = 'Vertical Bar';
  const ramps = 'Yes';
  const stairs = 'Yes';

  const readAccessibleData = () => {
    const textToRead = `Location: ${location}, Door Type: ${doorType}, Door Knob: ${doorKnob}, Ramps: ${ramps}, Stairs: ${stairs}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4">
      <div className="pb-4">
        <strong>Location:</strong> {location}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong>Door Type:</strong> {doorType}
        </div>
        <div>
          <strong>Door Knob:</strong> {doorKnob}
        </div>
        <div>
          <strong>Ramps:</strong> {ramps}
        </div>
        <div>
          <strong>Stairs:</strong> {stairs}
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={readAccessibleData}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold text-lg py-3 px-4 rounded"
        >
          Read Accessible Data
        </button>
      </div>
    </div>
  );
}
