import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { colors } from "../styles/colors";
import knightLogo from "../assets/knightlogo.png";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(
          to bottom right,
          ${colors.bgMain} 0%,
          ${colors.bgMid} 50%,
          ${colors.bgMain} 100%
        )`,
        color: colors.textPrimary,
      }}
    >
      {/* Navbar */}
      <div
        className="px-8 py-4 flex justify-between items-center border-black sticky top-0"
        style={{ backgroundColor: colors.NavbgMain }}
      > 
      <div className="flex items-center gap-2">
          <img src={knightLogo} alt="Knight Logo" className="h-10 w-10 object-contain" />
          <div className="text-2xl font-bold" style={{ color: colors.primary }}>
            ChessZone
          </div>
        </div>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#features" style={{ color: colors.textSecondary }}>
            Features
          </a>
          <a href="#about" style={{ color: colors.textSecondary }}>
            About
          </a>
          <a href="#contact" style={{ color: colors.textSecondary }}>
            Contact
          </a>
        </div>
      </div>

      {/* Hero */}
      <div className="flex flex-col md:flex-row items-center justify-center px-8 md:px-20 py-16 gap-12">
        <img
          src="/chess.png"
          alt="Chess board"
          className="w-64 md:w-96 rounded-2xl shadow-lg"
        />
        <div className="max-w-lg text-center md:text-left">
          <h1 className="text-5xl font-extrabold">Play Chess Online</h1>
          <p className="mt-4 text-lg" style={{ color: colors.textSecondary }}>
            Challenge friends, play as guest, and track your wins & losses.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button onClick={() => navigate("/game")}>Play as Guest</Button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-lg border transition"
              style={{
                borderColor: colors.primary,
                color: colors.primary,
              }}
            >
              Login / Signup
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div
        id="features"
        className="px-8 md:px-20 py-12 grid md:grid-cols-3 gap-8"
      >
        {[
          {
            title: "Real-Time Matches",
            desc: "Play live against other players.",
          },
          { title: "Game History", desc: "Track wins, losses, and match stats." },
          { title: "Invite Friends", desc: "Share a link to challenge someone." },
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl shadow-md"
            style={{ backgroundColor: colors.bgPanel }}
          >
            <h2
              className="text-xl font-bold"
              style={{ color: colors.primary }}
            >
              {f.title}
            </h2>
            <p className="mt-2" style={{ color: colors.textSecondary }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
