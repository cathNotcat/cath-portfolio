# Install Vite

npm create vite@latest my-react-app

Framework: React
Variant: JavaScript

# Install TailwindCSS

npm install -D tailwindcss@3 postcss autoprefixer

## Manually create config file in root (if it matches, it will automatically create the files)

npx tailwindcss init -p

These will appear:
tailwind.config.js
postcss.config.js

## Change Content Section (tailwind.config.js)

export default {
content: [
"./index.html",
"./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}

## Replace index.css

@tailwind base;
@tailwind components;
@tailwind utilities;

## Import CSS

main.jsx has this:
import './index.css'

## Custom Color Tailwind

tailwind.config.js
in the extend section:

theme: {
extend: {
colors: {
primary: {
bg: "#F8F6F3",
text: "#000000",
},
secondary: {
bg: "#F2F0ED",
text: "#474747",
},
tertiary: {
bg: "#CCCCCC",
text: "#F5F5F5",
},
},
},
},

## Custom Fonts Tailwind

get from google fonts > paste it in the <head> of index.html

<link
      href="https://fonts.googleapis.com/css2?family=Epilogue:wght@300;400;500;600&family=Inria+Serif:wght@300;400;700&display=swap"
      rel="stylesheet"
    />

in the tailwind.config.js add the extend:
theme: {
extend: {
fontFamily: {
sans: ["Epilogue", "sans-serif"],
serif: ["Inria Serif", "serif"],
},

## Icons

npm install react-icons

usage:
import {FaBars, FaTimes} from "react-icons/fa

## TailwindCSS Lines

npm install @tailwindcss/line-clamp
tailwind.config.js

plugins: [require('@tailwindcss/line-clamp')],

## Transition for pages

npm install framer-motion

import { motion } from "framer-motion";

<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 1 }}

>   <App />
> </motion.div>
