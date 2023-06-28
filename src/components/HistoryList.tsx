import { useFetchAllHistories } from "../use_cases/fetch_chat_histories";
import { ChatHistory } from "../domain";
import React, { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { PiClockCountdownThin } from "react-icons/pi";
import { BsSearch, BsCheckLg } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch } from "../redux/store";
import { deleteChat, selectChat } from "../redux/slices/chatHistorySlice";
import { dispatch } from "../redux/store";
import { resetMessages } from "../redux/slices/chatHistorySlice";

const HistoryCard: React.FC<{ history: ChatHistory }> = ({ history }) => {
  const dispatch = useDispatch();

  const title =
    history.title.length > 15
      ? history.title.substring(0, 15) + "..."
      : history.title;

  const timestamp = new Date().toLocaleString();

  const [showIconsDeleteAndDismiss, setShowIconsDeleteAndDismiss] =
    useState(false);

  const handleDelete = (id: string) => {
    dispatch(deleteChat(id));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        background: "#FDBA74",
        margin: "10px",
        padding: "10px",
        borderRadius: "5px",
        alignItems: "center",
      }}
      onClick={() => {
        dispatch(selectChat(history.id));
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "15px",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <BsSearch
          style={{
            fontSize: "20px",
            color: "white",
            background: "rgb(249, 115, 22)",
            borderRadius: "90px",
            padding: "10px",
          }}
        />
        <div>
          <h3 style={{ padding: 0, margin: 0 }}>{title}</h3>
          <div
            style={{
              display: "flex",
              color: "grey",
              gap: "4px",
              alignItems: "center",
            }}
          >
            <PiClockCountdownThin />
            <p style={{ padding: 0, margin: 0, color: "grey", fontSize: 14 }}>
              {timestamp}
            </p>
          </div>
        </div>
      </div>
      {!showIconsDeleteAndDismiss && (
        <div onClick={() => setShowIconsDeleteAndDismiss(true)}>
          <FiTrash style={{ color: "rgb(249, 115, 22)", fontSize: 20 }} />
        </div>
      )}

      {showIconsDeleteAndDismiss && (
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            onClick={() => {
              handleDelete(history.id);
              setShowIconsDeleteAndDismiss(false);
            }}
          >
            <BsCheckLg style={{ color: "rgb(249, 115, 22)", fontSize: 20 }} />
          </div>
          <div onClick={() => setShowIconsDeleteAndDismiss(false)}>
            <MdOutlineCancel
              style={{ color: "rgb(249, 115, 22)", fontSize: 20 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
const HistoryList: React.FC = () => {
  const { historiesList } = useFetchAllHistories();
  const deleteChat = () => {
    dispatch(resetMessages());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "white",
        borderRadius: "5px",
        height: "100%",
        border: "1px solid #e5e7eb",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: 0, padding: 20 }}>Historial de Búsquedas</h3>
      <h4
        style={{
          color: "red",
          margin: 0,
          padding: "0 20px 20px 20px",
          cursor: "pointer",
        }}
        onClick={deleteChat}
      >
        Eliminar todo
      </h4>
      <div style={{ border: "0.1px solid #e5e7eb" }} />
      {historiesList.map((history: ChatHistory) => (
        <HistoryCard key={history.id} history={history} />
      ))}
    </div>
  );
};

export default HistoryList;
