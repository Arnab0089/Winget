import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ClipboardCopy } from 'lucide-react';
import { useEffect } from 'react';
import UploadForm from './upload';

export default function WelcomeCard() {
  const [copiedCommand1, setCopiedCommand1] = useState(false);
  const [copiedCommand2, setCopiedCommand2] = useState(false);
  const [copiedCommand3, setCopiedCommand3] = useState(false);
  const [copiedCommand4, setCopiedCommand4] = useState(false);
  const [copiedCommand5, setCopiedCommand5] = useState(false);

  const [loggedIn, setLoggedIn] = useState('');
  useEffect(() => {
    setLoggedIn(localStorage.getItem('Username') || 'User');
  }, []);

  const command1 = `winget export -s winget -o export.json --include-versions`;
  const command2 = `$exportJson = Get-Content .\\export.json -Raw | ConvertFrom-Json
$exportPackages = $exportJson.Sources[0].Packages`;

  const command3 = `$installed = winget list --source winget | Select-String "^\\S" | ForEach-Object {
    $parts = ($_ -replace '\\s{2,}', '|').Split('|')
    if ($parts.Length -ge 3) {
        [PSCustomObject]@{
            Name    = $parts[0].Trim()
            Id      = $parts[1].Trim()
            Version = $parts[2].Trim()
        }
    }
}`;
  const command4 = `foreach ($pkg in $exportPackages) {
    $match = $installed | Where-Object { $_.Id -eq $pkg.PackageIdentifier -and $_.Version -eq $pkg.Version }
    if ($match) {
        $pkg | Add-Member -NotePropertyName "Name" -NotePropertyValue $match.Name
    }
}`;
  const command5 = `$exportJson | ConvertTo-Json -Depth 4 | Set-Content "output_with_names.json"`;

  const handleCopy = async (text, setCopied) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className="text-white bg-gradient-to-r from-secondary to-tertiary rounded-2xl shadow-xl px-4 py-6 sm:px-8 sm:py-10 w-full max-w-4xl mx-auto m-4">
      {/* Heading Animation */}
      <div className="hidden md:block">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold italic text-center origin-left inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 0.2,
          }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          Hello {loggedIn}, Thanks for using this app!
        </motion.h1>
      </div>
      {/* Heading for smaller screens */}
      <div className="md:hidden">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold italic text-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'reverse',
            repeatDelay: 1,
          }}
        >
          Hello User, Thanks for using this app!
        </motion.h1>
      </div>

      {/* Subheading */}
      <motion.p
        className="text-sm sm:text-base md:text-lg text-center mt-4 text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        This app is designed to help you with your tasks efficiently and
        effectively. We hope you find it useful!
      </motion.p>

      {/* Description */}
      <motion.div
        className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-justify"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 2,
        }}
      >
        <p>
          <span className="font-semibold text-primary">Winget Sheet</span> lets
          you instantly export all apps installed on your PC into a smart,
          shareable sheet — complete with icons, versions, and reinstall
          commands. Whether you're setting up a new PC or helping a friend, just
          upload your app list and get a unique{' '}
          <span className="underline">code + PowerShell script</span> to
          reinstall everything using winget. It's like a personalized app
          toolbox — clean, fast, and automated! 🚀
        </p>
      </motion.div>

      <div className="border-t border-white/20 mt-8 mb-4 gap-4" />

      {/* Code Box 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 2.5,
        }}
        className="relative mb-6"
      >
        <pre className="bg-[#090040] text-primary text-sm font-mono rounded-xl p-4 overflow-x-auto shadow-inner">
          <code>{command1}</code>
        </pre>
        <button
          onClick={() => handleCopy(command1, setCopiedCommand1)}
          className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs text-white backdrop-blur"
        >
          {copiedCommand1 ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <ClipboardCopy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </motion.div>

      {/* Code Box 2 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="relative mb-6"
      >
        <pre className="bg-[#090040] text-primary text-sm font-mono rounded-xl p-4 overflow-auto scrollbar-hidden shadow-inner">
          <code>{command2}</code>
        </pre>
        <button
          onClick={() => handleCopy(command2, setCopiedCommand2)}
          className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs text-white backdrop-blur"
        >
          {copiedCommand2 ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <ClipboardCopy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </motion.div>

      {/* code Box3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="relative mb-6"
      >
        <pre className="bg-[#090040] text-primary text-sm font-mono rounded-xl p-4 overflow-auto scrollbar-hidden shadow-inner">
          <code>{command3}</code>
        </pre>
        <button
          onClick={() => handleCopy(command3, setCopiedCommand3)}
          className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs text-white backdrop-blur"
        >
          {copiedCommand3 ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <ClipboardCopy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </motion.div>
      {/* code Box4 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="relative mb-6"
      >
        <pre className="bg-[#090040] text-primary text-sm font-mono rounded-xl p-4 overflow-auto scrollbar-hidden shadow-inner">
          <code>{command4}</code>
        </pre>
        <button
          onClick={() => handleCopy(command4, setCopiedCommand4)}
          className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs text-white backdrop-blur"
        >
          {copiedCommand4 ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <ClipboardCopy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </motion.div>
      {/* code Box5 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          delay: 3,
        }}
        className="relative mb-6"
      >
        <pre className="bg-[#090040] text-primary text-sm font-mono rounded-xl p-4 overflow-auto scrollbar-hidden shadow-inner">
          <code>{command5}</code>
        </pre>
        <button
          onClick={() => handleCopy(command5, setCopiedCommand5)}
          className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs text-white backdrop-blur"
        >
          {copiedCommand5 ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <ClipboardCopy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </motion.div>

      <div className="text-sm sm:text-base md:text-lg text-yellow-500 font-bold capitalize mt-4 text-center">
        <p>
          In your system there is a json file with name of
          "output_with_names.json"
        </p>
        <p>upload this file in this box</p>
      </div>

      {/* {upload Box} */}

      <div className="mt-6">
        <UploadForm />
      </div>
    </div>
  );
}
