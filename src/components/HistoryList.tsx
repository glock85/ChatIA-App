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
import "../styles/history-list.css";

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
      className="history-card-container"
      onClick={() => {
        dispatch(selectChat(history.id));
      }}
    >
      <div className="history-card-container__search">
        <BsSearch className="history-card-container__search-icon" />
        <div>
          <h3 style={{ padding: 0, margin: 0 }}>{title}</h3>
          <div className="history-card-container__search-icon__timestamp">
            <PiClockCountdownThin />
            <p className="history-card-container__search-icon__timestamp__text">
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
    <div className="history-list-container">
      <h3 style={{ margin: 0, padding: 20 }}>Historial de Búsquedas</h3>
      <h4 className="history-list-container__delete-all" onClick={deleteChat}>
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
