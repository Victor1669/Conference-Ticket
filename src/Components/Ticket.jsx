import Logo from "./Logo";

export default function Ticket({
  nome = "",
  email = "",
  imagem = "",
  github = "",
}) {
  const data = new Date();

  const dataFormatada = data.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const randomTicketID = crypto.getRandomValues(new Uint8Array(2));

  return (
    <div className="ticketScreenContainer">
      <div className="ticketScreenHeader">
        <h2 className="ticketTitle">
          Congrats, <span className="userName">{nome}!</span> Your ticket is
          ready.
        </h2>
        <p className="ticketMessage">
          We´ve emailed your ticket to{" "}
          <span className="ticketEmail">{email}</span> and will sendupdates in
          the run up to the event
        </p>
      </div>
      <div className="ticketScreenBody">
        <div className="ticketContainer">
          <img className="ticketImg" src="/images/pattern-ticket.svg" />
          <div className="logoDate">
            <Logo />
            <p>{dataFormatada} / Austin, TX</p>
          </div>
          <div className="userInfoContainer">
            <img className="userInfoImage" src={imagem} />

            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p className="userInfoName">{nome}</p>
              <span className="userInfoGitHub">
                <img src="/images/icon-github.svg" />
                <p>{github}</p>
              </span>
            </span>
          </div>
          <span className="ticketID">#{randomTicketID}</span>
        </div>
      </div>
    </div>
  );
}
