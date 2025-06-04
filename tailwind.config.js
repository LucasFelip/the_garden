/** @type {import('tailwindcss').Config} */
    export default {
      darkMode: ["class"],
      content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
      ],
      theme: {
        container: {
          center: true,
          padding: "2rem",
          screens: {
            "2xl": "1400px",
          },
        },
        extend: {
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
            'brown-50': 'hsl(30, 50%, 95%)', // Lightest brown, almost beige
            'brown-100': 'hsl(30, 50%, 85%)',
            'brown-200': 'hsl(30, 45%, 75%)',
            'brown-300': 'hsl(30, 45%, 65%)',
            'brown-400': 'hsl(30, 40%, 55%)', // Mid-tone brown
            'brown-500': 'hsl(30, 40%, 45%)', // Base brown
            'brown-600': 'hsl(30, 40%, 35%)', // Darker brown
            'brown-700': 'hsl(30, 45%, 25%)', // Very dark brown
            'brown-800': 'hsl(30, 50%, 20%)', // Near black brown
            'brown-900': 'hsl(30, 55%, 10%)', // Darkest, almost black
            'yellow-50': 'hsl(50, 100%, 95%)',
            'yellow-100': 'hsl(50, 100%, 90%)',
            'yellow-200': 'hsl(48, 95%, 80%)',
            'yellow-300': 'hsl(48, 95%, 70%)', // Sunflower petal
            'yellow-400': 'hsl(45, 90%, 60%)', // Sunflower center
            'yellow-500': 'hsl(42, 85%, 55%)', // Deeper sunflower
            'green-50': 'hsl(90, 60%, 95%)',
            'green-100': 'hsl(90, 60%, 85%)',
            'green-200': 'hsl(90, 55%, 75%)',
            'green-300': 'hsl(90, 50%, 65%)', // Light green, leaves
            'green-400': 'hsl(90, 45%, 55%)', // Medium green
            'green-500': 'hsl(90, 45%, 45%)', // Darker green, foliage
            'green-600': 'hsl(90, 40%, 35%)',
            'green-700': 'hsl(90, 40%, 25%)', // Deep forest green
            'beige-100': 'hsl(var(--beige-100))', // For the garden background
          },
          borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
          },
          keyframes: {
            "accordion-down": {
              from: { height: 0 },
              to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
              from: { height: "var(--radix-accordion-content-height)" },
              to: { height: 0 },
            },
            "petal-fall": {
              "0%": { transform: "translateY(-20%) rotate(0deg)", opacity: 0 },
              "20%": { opacity: 1 },
              "100%": { transform: "translateY(120vh) rotate(720deg)", opacity: 0.5 },
            },
            "subtle-pulse": {
              "0%, 100%": { transform: "scale(1)", opacity: 1 },
              "50%": { transform: "scale(1.03)", opacity: 0.8 },
            }
          },
          animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "petal-fall": "petal-fall linear forwards",
            "subtle-pulse": "subtle-pulse 2s ease-in-out infinite",
          },
          fontFamily: {
            merriweather: ['Merriweather', 'serif'],
            caveat: ['Caveat', 'cursive'],
          },
        },
      },
      plugins: [require("tailwindcss-animate")],
    }