# Interactive Banner Generator

A modern, interactive web application built with Next.js that allows users to create customizable 3D banners with dynamic particle effects.

## Features

- **3D Banner Customization**
  - Custom text input
  - Background color selection
  - Icon selection (Laptop, Code, Palette)
  - Icon size control

- **Interactive Particle Effects**
  - Enable/disable particle animations
  - Customize particle colors
  - Adjust particle count (10-200)
  - Control particle size (1-10px)
  - Modify particle speed
  - Real-time preview

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Radix UI Components (full suite of UI primitives)
- Three.js (via @react-three/fiber v9 and @react-three/drei v10)
- Framer Motion v12
- GSAP for advanced animations
- Lucide React for icons
- Class Variance Authority for component styling
- Various utility libraries (clsx, date-fns, etc.)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Usage

1. **Banner Text**: Enter your desired text in the input field
2. **Colors**: Use the color picker to customize background color
3. **Icons**: Select from available icons (Laptop, Code, Palette) and adjust their size
4. **Particles**: 
   - Toggle particle effects on/off
   - Adjust particle count, size, and speed
   - Customize particle colors
   - Preview changes in real-time

## Project Structure

- `app/` - Next.js application files
  - `page.tsx` - Main application component
  - `layout.tsx` - Root layout
- `components/` - Reusable UI components
  - `ui/` - Radix UI components
  - `particles.tsx` - Particle effect component

## License

MIT
