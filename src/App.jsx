import { useState } from "react";

import Header from "./Components/Header";
import Logo from "./Components/Logo";
import Ticket from "./Components/Ticket";

import Form from "./Components/Form";

export default function App() {
  const [showTicket, setShowTicket] = useState(false);

  const [imgSrc, setImgSrc] = useState("/images/icon-upload.svg");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [github, setGithub] = useState("");

  return (
    <div className="App">
      <Logo className="app" />
      {showTicket ? (
        <Ticket imagem={imgSrc} nome={name} email={email} github={github} />
      ) : (
        <>
          <Header />
          <Form
            imgSrc={imgSrc}
            setImgSrc={setImgSrc}
            setName={setName}
            setEmail={setEmail}
            setGithub={setGithub}
            onShowTicket={setShowTicket}
          />
        </>
      )}
    </div>
  );
}
