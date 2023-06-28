import moment from "moment";
import {ChatMessage} from "../domain";

const CardMessageUser = ({ message }: { message: ChatMessage }) => {
  return (
    <div
      style={{
        width: "90%",
        margin: "20px auto 20px",
        border: message.role === "user" ? "1px solid #e5e7eb" : "1px solid rgb(249, 115, 22)",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          padding: "0 25px 0 25px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
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
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default CardMessageUser;
