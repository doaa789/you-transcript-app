export default function Footer() {
    return (
      <footer className="bg-base-100  backdrop-blur-md shadow-md border-t font-semibold border-white/30 p-4">
        <div className="max-w-4xl mx-auto text-center text-sm">
          &copy; {new Date().getFullYear()} YouTube Transcript Extraction Site. All rights reserved.
        </div>
      </footer>
    )
  }
  