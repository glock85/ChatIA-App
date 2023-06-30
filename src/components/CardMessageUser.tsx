import moment from "moment";
import { ChatMessage } from "../domain";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

const CardMessageUser = ({ message }: { message: ChatMessage }) => {
  const codeBlockRegex = /```([^`]+)```/g;
  const contentWithCodeBlocks = message.content.match(codeBlockRegex) || [];
  const parts = message.content.split(codeBlockRegex);

  const formattedContent = parts.map((part, index) => {
    if (index % 2 === 0) {
      return <p key={index}>{part}</p>;
    } else {
      const codeContent =
        contentWithCodeBlocks[Math.floor(index / 2)]?.trim() || "";
      return (
        <SyntaxHighlighter
          key={index}
          language="javascript"
          style={solarizedlight}
        >
          {codeContent}
        </SyntaxHighlighter>
      );
    }
  });
  return (
    <div
      className="card-message-user"
      style={{
        border:
          message.role === "user"
            ? "1px solid #e5e7eb"
            : "1px solid rgb(249, 115, 22)",
      }}
    >
      <div className="padding-general-chat">
        <div className="header-card-message-user">
          <p
            style={{
              color: message.role === "user" ? "green" : "rgb(249, 115, 22)",
              fontWeight: "bold",
            }}
          >
            {message.role === "user" ? "Ana Clara" : "OdamaChat"}
          </p>
          <p style={{ color: "grey" }}>{moment().startOf("hour").fromNow()}</p>
        </div>
        {formattedContent}
      </div>
    </div>
  );
};

export default CardMessageUser;
