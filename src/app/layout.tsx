import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"] });

export const metadata: Metadata = {
	title:
		"AI Plate: Your Smart Diet Assistant for Nutrient Tracking & Meal Planning",
	description:
		"Experience the future of healthy eating with AI Plate. Just enter your meals, and let AI break them down into nutrients and count calories for you. Get custom daily nutrition goals based on your unique profile and enjoy recipes tailored to meet your needs.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={syne.className}>{children}</body>
		</html>
	);
}
