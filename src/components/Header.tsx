import { BsChevronLeft } from "react-icons/bs";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import "../styles/header.css";

const Header = ({
  callback,
  isToggle,
}: {
  callback: any;
  isToggle: boolean;
}) => {
  return (
    <div className="header-container">
      <div className="header-container__left">
        <div className="header-container__left__back">
          <BsChevronLeft style={{ fontSize: "16px", color: "white" }} />
          <p>Atrás</p>
        </div>
        <div
          className="header-container__left__collapse"
          style={{
            background: !isToggle ? "#F97316" : "white",
            color: isToggle ? "#F97316" : "white",
          }}
          onClick={callback}
        >
          <TbLayoutSidebarLeftCollapse />
        </div>
      </div>
      <div
        className="header-container__left__collapse"
        style={{ color: "white" }}
      >
        <IoSettingsOutline />
      </div>
    </div>
  );
};

export default Header;
