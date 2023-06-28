const CardMessageIALoading = () => {
  return (
    <div
      style={{
        width: "90%",
        margin: "20px auto 20px",
        border: "1px solid #e5e7eb",
        boxShadow: "0px 0px 10px 0px rgb(249, 115, 22)",
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
          <p style={{ color: "#F97316", fontWeight: "bold" }}>OdamaChat</p>
          <p style={{ color: "#F97316", fontWeight: "bold" }}>...</p>
        </div>
      </div>
    </div>
  );
};

export default CardMessageIALoading;
