import theme from "../theme/theme";

export default function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <div
        style={{
          width: 28,
          height: 28,
          border: `2.5px solid ${theme.border}`,
          borderTopColor: theme.gold,
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
    </div>
  );
}