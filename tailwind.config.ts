import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        background: "var(--color-background)",
        surface: {
          DEFAULT: "var(--color-surface)",
          elevated: "var(--color-surface-elevated)",
        },
        brand: {
          purple: "var(--color-brand-purple)",
          violet: "var(--color-brand-violet)",
          magenta: "var(--color-brand-magenta)",
          orange: "var(--color-brand-orange)",
          amber: "var(--color-brand-amber)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
        },
        border: {
          glass: "var(--color-border-glass)",
          active: "var(--color-border-active)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "glow-purple": "0 0 25px rgba(121, 40, 202, 0.35)",
        "glow-violet": "0 0 25px rgba(155, 81, 224, 0.35)",
        "glow-magenta": "0 0 25px rgba(255, 0, 122, 0.35)",
        "glow-orange": "0 0 25px rgba(255, 94, 0, 0.35)",
        "card-glow": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-brand": "linear-gradient(135deg, var(--color-brand-orange) 0%, var(--color-brand-magenta) 50%, var(--color-brand-violet) 100%)",
        "gradient-purple-magenta": "linear-gradient(135deg, var(--color-brand-purple) 0%, var(--color-brand-magenta) 100%)",
        "gradient-orange-pink": "linear-gradient(135deg, var(--color-brand-orange) 0%, var(--color-brand-magenta) 100%)",
      },
      maxWidth: {
        "content": "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
