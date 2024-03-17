/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./layout/**/*.{js,ts,jsx,tsx,mdx}",
     
        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
      ],
    theme: {
        screens: {
            xs: '400px',
            sm: '480px',
            md: '768px',
            xl: '1440px',
        },
        extend: {
            colors: {
                'blue-opaque': 'rgb(13 42 148 / 18%)',
                gray: {
                    0: '#fff',
                    100: '#fafafa',
                    200: '#eaeaea',
                    300: '#999999',
                    400: '#888888',
                    500: '#666666',
                    600: '#444444',
                    700: '#333333',
                    800: '#222222',
                    900: '#111111'
                },
                primaryColor: '#2B3542',
                secondaryColor: '#E2E0DD',
                secondaryColorHover: '#D0CDC9',
            }
        },
    },
    plugins: [],
}

