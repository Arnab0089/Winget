import { motion } from 'framer-motion';

export default function about() {
  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-4xl font-bold text-blue-400 mb-4"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        🧰 About Winget App Manager
      </motion.h1>

      <motion.p
        className="text-lg mb-6 text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Winget App Manager is a smart, efficient tool that helps Windows users
        export, store, and reinstall their installed apps using the powerful
        Winget CLI.
      </motion.p>

      <Section title="🔍 What It Does">
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>
            <strong>Export Installed Apps</strong> – Generate a JSON list of
            installed apps (name, ID, version, source).
          </li>
          <li>
            <strong>Upload & Store</strong> – Save your app list securely online
            for future use.
          </li>
          <li>
            <strong>One-Click Reinstall</strong> – Get ready-to-use Winget
            commands to restore your setup on any PC.
          </li>
          <li>
            <strong>Preview & Copy</strong> – View your app list and copy
            individual Winget install commands.
          </li>
        </ul>
      </Section>

      <Section title="🧠 Why This App?">
        <p className="text-gray-300">
          Reinstalling apps manually after a system reset is tedious. Winget App
          Manager simplifies this with a clean UI and automation, so you never
          lose track of your essential software.
        </p>
      </Section>

      <Section title="⚙️ Built With">
        <p className="text-gray-300">
          <span className="font-medium">Frontend:</span> React, Tailwind CSS,
          Framer Motion
          <br />
          <span className="font-medium">Backend:</span> Node.js, Express,
          MongoDB
          <br />
          <span className="font-medium">Others:</span> Uploadcare/UploadThing,
          JWT, Axios, Winget CLI
        </p>
      </Section>

      <Section title="🛠 Example Use Case">
        <ol className="list-decimal list-inside text-gray-300 space-y-1">
          <li>
            Run{' '}
            <code className="bg-gray-800 px-1 py-0.5 rounded">
              winget export
            </code>{' '}
            to generate your app list.
          </li>
          <li>Upload the JSON file to the app.</li>
          <li>Log in after reinstalling Windows to access your list.</li>
          <li>Reinstall all apps in one click using Winget commands.</li>
        </ol>
      </Section>

      <Section title="👨‍💻 Developer">
        <p className="text-gray-300">
          Built with ❤️ by{' '}
          <span className="font-semibold text-blue-300">Arnab Kundu</span>, a
          CSE student and full-stack dev passionate about simplifying workflows
          with code.
        </p>
      </Section>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold text-blue-300 mb-2">{title}</h2>
      {children}
    </motion.div>
  );
}
