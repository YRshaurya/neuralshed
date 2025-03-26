export const metadata = {
    title: 'NeuralShed - Innovation at the Confluence of Technology',
    description: 'We bring robots to humans with cutting-edge solutions.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
            </head>
            <body>
                {children}
            </body>
        </html>
    );
} 