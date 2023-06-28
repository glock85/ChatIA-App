import { BsChevronLeft } from "react-icons/bs";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

const Header = ({ callback, isToggle }: { callback: any, isToggle: boolean }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        background: "#F97316",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "15px",
            cursor: "pointer",
            alignItems: "center",
            color: "white",
            border: "1px solid white",
            paddingLeft: "15px",
            paddingRight: "25px",
            borderRadius: "5px",
            height: "30px",
          }}
        >
          <BsChevronLeft style={{ fontSize: "16px", color: "white" }} />
          <p>Atrás</p>
        </div>
        <div
          style={{
            display: "flex",
            cursor: "pointer",
            alignItems: "center",
            color: isToggle ? "#F97316" : "white",
            border: "1px solid white",
            paddingLeft: "15px",
            paddingRight: "15px",
            borderRadius: "5px",
            height: "30px",
            background: !isToggle ? "#F97316" : "white",
          }}
          onClick={callback}
        >
          <TbLayoutSidebarLeftCollapse />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
          color: "white",
          border: "1px solid white",
          paddingLeft: "15px",
          paddingRight: "15px",
          borderRadius: "5px",
          height: "30px",
        }}
      >
        <IoSettingsOutline />
      </div>
    </div>
  );
};

export default Header;
