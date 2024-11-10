import { useState } from "react";
import NfidLogin from "./components/NfidLogin";

function App() {
  const [backendActor, setBackendActor] = useState();
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [sentimentAnalysisResult, setSentimentAnalysisResult] = useState();

  function handleSubmitUserProfile(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    backendActor.setUserProfile(name).then((response) => {
      if (response.ok) {
        setUserId(response.ok.id.toString());
        setUserName(response.ok.name);
      } else if (response.err) {
        setUserId(response.err);
      } else {
        console.error(response);
        setUserId("Unexpected error, check the console");
      }
    });
    return false;
  }

  function handleSentimentAnalysis(event) {
    event.preventDefault();
    const phrase = event.target.elements.phrase.value;
    backendActor
      .outcall_ai_model_for_sentiment_analysis(phrase)
      .then((response) => {
        if (response.ok) {
          setSentimentAnalysisResult(response.ok.result);
        } else if (response.err) {
          setSentimentAnalysisResult(response.err);
        } else {
          console.error(response);
          setSentimentAnalysisResult("Unexpected error, check the console");
        }
      });
    return false;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <h1>Welcome to IC AI Hacker House!</h1>
      {!backendActor && (
        <section id="nfid-section">
          <NfidLogin setBackendActor={setBackendActor}></NfidLogin>
        </section>
      )}
      {backendActor && (
        <>
          <form action="#" onSubmit={handleSubmitUserProfile}>
            <label htmlFor="name">Enter your name: &nbsp;</label>
            <input id="name" alt="Name" type="text" />
            <button type="submit">Save</button>
          </form>
          <form action="#" onSubmit={handleSentimentAnalysis}>
            <label htmlFor="analysis">Sentiment analysis: &nbsp;</label>
            <input id="phrase" alt="Phrase" type="text" />
            <button type="submit">Analyze</button>
          </form>
          {userId && <section className="response">{userId}</section>}
          {userName && <section className="response">{userName}</section>}
          {sentimentAnalysisResult && (
            <section className="response">{sentimentAnalysisResult}</section>
          )}
        </>
      )}
    </main>
  );
}

export default App;
