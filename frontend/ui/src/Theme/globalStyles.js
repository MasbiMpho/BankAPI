import theme from "./theme";

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${theme.bg}; color: ${theme.text}; font-family: 'DM Sans', sans-serif; min-height: 100vh; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${theme.surface}; }
  ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 4px; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes goldGlow { 0%,100% { box-shadow: 0 0 0px ${theme.gold}30; } 50% { box-shadow: 0 0 28px ${theme.gold}40; } }
`;

export default globalStyles;