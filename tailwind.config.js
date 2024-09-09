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
  		center: 'true',
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		maxWidth: {
  			desktop: '1920px'
  		},
  		fontFamily: {
  			sans: ["var(--font-geist-sans)"],
  			mono: ["var(--font-geist-mono)"]
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		typography: {
  			sm: {
  				css: {
  					color: 'hsl(var(--muted-foreground))',
  					fontSize: '0.875rem',
  					lineHeight: '1.25rem',
  					h1: {
  						fontSize: '1.25rem',
  						fontWeight: '600',
  						lineHeight: '1.75rem',
  						marginBottom: '0.75em',
  						marginTop: '1.75em',
  						color: 'hsl(var(--foreground))',
  						["& > p"]: {
  							margin: '0',
  							fontSize: '1.25rem',
  							lineHeight: '1.75rem'
  						},
  						["& > span > p"]: {
  							marginBottom: '0',
  							fontSize: '1.25rem',
  							lineHeight: '1.75rem'
  						}
  					},
  					h2: {
  						fontSize: '1.2em',
  						fontWeight: '600',
  						lineHeight: '1.2em',
  						marginBottom: '0.75em',
  						marginTop: '1.75em',
  						color: 'hsl(var(--foreground))'
  					},
  					h3: {
  						fontSize: '1em',
  						fontWeight: '600',
  						lineHeight: '1.1em',
  						marginBottom: '0.5em',
  						marginTop: '1.5em',
  						color: 'hsl(var(--foreground))'
  					},
  					p: {
  						marginTop: '0'
  					},
  					ul: {
  						marginTop: '0',
  						textWrap: 'pretty',
  						["@media (min-width: 768px)"]: {
  							maxWidth: '70%'
  						}
  					},
  					li: {
  						marginTop: '0',
  						marginBottom: '0.5em'
  					},
  					a: {
  						fontSize: '0.9em',
  						opacity: '0.8'
  					},
  					hr: {
  						borderColor: 'hsl(var(--border))',
  						marginTop: '1.5em',
  						marginBottom: '1.5em'
  					},
  					img: {
  						marginTop: '0'
  					}
  				}
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
