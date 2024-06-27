/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      maxWidth: {
        desktop: "1920px",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        sm: {
          css: {
            color: "hsl(var(--muted-foreground))",
            lineHeight: "1.5em",
            h1: {
              fontSize: "1.5em",
              fontWeight: "600",
              lineHeight: "1.2em",
              marginBottom: "0.5em",
              color: "hsl(var(--foreground))",
              ["&>p"]: {
                margin: "0",
              },
            },
            h2: {
              fontSize: "1.2em",
              fontWeight: "600",
              lineHeight: "1.2em",
              marginBottom: "0.5em",
              color: "hsl(var(--foreground))",
            },
            h3: {
              fontSize: "1em",
              fontWeight: "600",
              lineHeight: "1.1em",
              marginBottom: "0.5em",
              color: "hsl(var(--foreground))",
            },
            p: {
              marginTop: "0",
              "& ~ ul": {
                marginTop: "-1.1428571em",
              },
            },
            ul: {
              paddingTop: "16px",
              paddingBottom: "16px",
              marginLeft: "0rem",
              paddingLeft: "1rem",
              textWrap: "balance",
            },
            li: {
              marginBottom: "0.5em",
            },
            a: {
              fontSize: "0.9em",
              opacity: 0.8,
            },
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
