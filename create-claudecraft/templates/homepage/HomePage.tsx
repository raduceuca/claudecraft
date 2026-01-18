import { CodeBlock } from '@/components/ui/CodeBlock'
import { CopyCommand } from '@/components/ui/CopyCommand'
import { UICarousel } from '@/components/ui/UICarousel'
import { FilePreview } from '@/components/ui/FilePreview'

export function HomePage() {
  return (
    <div className="min-h-dvh bg-base-100 text-base-content">
      <article className="max-w-xl mx-auto px-6 py-20">

        {/* Header */}
        <header className="mb-20">
          <h1 className="text-2xl font-bold mb-6 text-balance">claudecraft</h1>
          <p className="text-base-content/70 text-pretty mb-4">
            Hey, designer. Your job isn't going anywhere—but it is getting weirder. The robots are here, and they have opinions about border-radius.
          </p>
          <p className="text-base-content/70 text-pretty">
            This is a boilerplate for people who'd rather shape the slop than become it. Pre-configured with design constraints, accessibility guilt trips, and 32 themes so you can procrastinate on the hard decisions.
          </p>
        </header>


        {/* Get Started */}
        <section className="mb-20">
          <h2 className="text-lg font-semibold mb-6 text-balance">Get Started</h2>

          {/* Download option */}
          <p className="text-base-content/80 mb-4">
            <a
              href="https://github.com/raduceuca/claudecraft/archive/refs/heads/main.zip"
              className="underline underline-offset-4 hover:text-primary transition-colors"
            >
              Download the ZIP
            </a>
            {' '}and unzip it. That's your project folder.
          </p>

          {/* Or clone */}
          <p className="text-sm text-base-content/50 mb-2">
            Or if you know your way around a terminal:
          </p>
          <CopyCommand>git clone https://github.com/raduceuca/claudecraft my-app</CopyCommand>

          {/* Bun installation - hand-drawn style */}
          <div
            className="relative my-8 p-5 border-2 border-dashed border-base-content/25 bg-base-200/30"
            style={{
              borderRadius: '16px 8px 12px 20px',
              transform: 'rotate(-0.3deg)',
            }}
          >
            <p
              className="text-2xl mb-2 text-base-content font-medium"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              You'll need Bun!
            </p>
            <p className="text-sm text-base-content/70 mb-3">
              It runs your code. Paste this in Terminal (Mac) or WSL (Windows):
            </p>
            <CopyCommand>curl -fsSL https://bun.sh/install | bash</CopyCommand>
          </div>

          {/* Run it */}
          <p className="text-sm font-medium mb-3">Then run it:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <CopyCommand>bun install</CopyCommand>
              <span className="text-sm text-base-content/50">downloads dependencies</span>
            </div>
            <div className="flex items-center gap-3">
              <CopyCommand>bun dev</CopyCommand>
              <span className="text-sm text-base-content/50">starts the server</span>
            </div>
          </div>
          <p className="text-sm text-base-content/50 mt-4">
            Open <code className="font-mono text-primary">localhost:6969</code> in your browser. Nice.
          </p>
        </section>


        {/* Stack */}
        <section className="mb-20">
          <h2 className="text-lg font-semibold mb-6 text-balance">Stack</h2>
          <div className="grid grid-cols-4 gap-4">
            {/* React */}
            <div className="flex flex-col items-center gap-2">
              <svg className="size-8 text-base-content/70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
              </svg>
              <span className="text-xs text-base-content/70">React</span>
            </div>
            {/* TypeScript */}
            <div className="flex flex-col items-center gap-2">
              <svg className="size-8 text-base-content/70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
              </svg>
              <span className="text-xs text-base-content/70">TypeScript</span>
            </div>
            {/* Vite */}
            <div className="flex flex-col items-center gap-2">
              <svg className="size-8 text-base-content/70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="m8.286 10.578.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887 2.077-.4a.8.8 0 0 1 .84.369.8.8 0 0 1 .034.783L12.9 19.93l-.013.025-.015.023-.122.19a.801.801 0 0 1-.672.37.826.826 0 0 1-.634-.302.8.8 0 0 1-.16-.67l1.029-4.981-1.12.34a.81.81 0 0 1-.86-.262.802.802 0 0 1-.165-.67l.63-3.08-2.027.468a.808.808 0 0 1-.768-.233.81.81 0 0 1-.217-.6l.389-6.57-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z"/>
              </svg>
              <span className="text-xs text-base-content/70">Vite</span>
            </div>
            {/* Tailwind */}
            <div className="flex flex-col items-center gap-2">
              <svg className="size-8 text-base-content/70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
              </svg>
              <span className="text-xs text-base-content/70">Tailwind</span>
            </div>
            {/* DaisyUI */}
            <div className="flex flex-col items-center gap-2">
              <svg className="size-8 text-base-content/70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-1.56 0-3.137.721-4.095 2.122a5 5 0 0 0-.857-.081c-1.353-.006-2.62.565-3.53 1.476C2.415 4.62 1.81 6.241 2.121 7.905.722 8.863 0 10.44 0 12s.721 3.137 2.122 4.095c-.31 1.664.294 3.286 1.395 4.388 1.102 1.101 2.724 1.706 4.388 1.395C8.863 23.278 10.44 24 12 24s3.137-.721 4.095-2.122c1.664.31 3.286-.294 4.388-1.395 1.101-1.102 1.706-2.724 1.395-4.388C23.278 15.137 24 13.56 24 12s-.721-3.137-2.122-4.095c.31-1.664-.294-3.286-1.395-4.388-1.102-1.101-2.724-1.706-4.388-1.395C15.137.722 13.56 0 12 0m0 .962c1.18 0 2.345.471 3.123 1.447a5 5 0 0 0-.64.315 4.97 4.97 0 0 1-4.965 0 5 5 0 0 0-.64-.315C9.654 1.433 10.82.962 12 .962M7.026 2.99q.196 0 .397.023a5 5 0 0 0-.229.67 4.97 4.97 0 0 1-3.511 3.511 5 5 0 0 0-.67.229c-.138-1.238.352-2.393 1.185-3.225.743-.743 1.742-1.214 2.828-1.208m10.011 0c1.062.013 2.037.479 2.765 1.208.833.832 1.323 1.987 1.185 3.225a5 5 0 0 0-.67-.229 4.97 4.97 0 0 1-3.511-3.511 5 5 0 0 0-.229-.67 4 4 0 0 1 .46-.023m-5.404 8.863a.627.627 0 0 1 .627.627.627.627 0 0 1-.627.627.627.627 0 0 1-.628-.627.627.627 0 0 1 .628-.627m-3.825 0a.627.627 0 0 1 .628.627.627.627 0 0 1-.628.627.627.627 0 0 1-.627-.627.627.627 0 0 1 .627-.627m7.837 0a.627.627 0 0 1 .628.627.627.627 0 0 1-.628.627.627.627 0 0 1-.627-.627.627.627 0 0 1 .627-.627m-5.551 2.48a.32.32 0 0 0-.232.082.32.32 0 0 0-.023.453c.296.328.737.524 1.18.524.441 0 .882-.196 1.178-.524a.32.32 0 0 0-.023-.453.32.32 0 0 0-.453.023c-.145.16-.486.312-.703.312s-.558-.152-.703-.312a.32.32 0 0 0-.221-.106"/>
              </svg>
              <span className="text-xs text-base-content/70">DaisyUI</span>
            </div>
            {/* Vitest */}
            <div className="flex flex-col items-center gap-2">
              <svg className="size-8 text-base-content/70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M13.74024 1.05293a.49504.49504 0 0 0-.1569.02512.49338.49338 0 0 0-.25056.1876L7.59513 9.56159a.4895.4895 0 0 0-.08373.22327.48846.48846 0 0 0 .03163.23629.4893.4893 0 0 0 .13985.19319.4927.4927 0 0 0 .2149.10481l3.70685.78609-.22947 4.58007a.48834.48834 0 0 0 .08466.30017.49205.49205 0 0 0 .24931.18854c.10157.03398.21174.03444.3135.00064a.49387.49387 0 0 0 .25056-.18761l5.73735-8.29594a.4884.4884 0 0 0 .08404-.22327c.009-.08015-.0016-.16137-.03163-.23629a.48835.48835 0 0 0-.13985-.19319.49318.49318 0 0 0-.2149-.1048l-3.70686-.7861.22947-4.58008a.48802.48802 0 0 0-.08466-.30017.4913.4913 0 0 0-.24931-.18853.49439.49439 0 0 0-.1566-.02574zM1.15697 9.78795c-.30647.0012-.60009.12378-.81679.34048a1.16107 1.16107 0 0 0-.34017.81648 1.162 1.162 0 0 0 .33366.81957l10.84241 10.8421a1.15762 1.15762 0 0 0 .37677.25211 1.1583 1.1583 0 0 0 .44467.08838c.00084 0 .0016-.00031.0025-.00031.00073 0 .0014.00031.0022.00031a1.15827 1.15827 0 0 0 .44467-.08838 1.15731 1.15731 0 0 0 .37677-.2521l10.84236-10.8421a1.16272 1.16272 0 0 0 .33397-.81958c-.0013-.30647-.12376-.59976-.34048-.81648a1.1616 1.1616 0 0 0-.81679-.34048 1.16114 1.16114 0 0 0-.81926.33366l-5.4012 5.4009c-.0078.0074-.01718.01255-.02482.02015L12 20.14011l-4.59776-4.59745c-.0074-.0074-.01659-.01238-.02419-.01954l-5.4015-5.40151a1.162 1.162 0 0 0-.81958-.33366Z"/>
              </svg>
              <span className="text-xs text-base-content/70">Vitest</span>
            </div>
            {/* Testing Library */}
            <div className="flex flex-col items-center gap-2">
              <svg className="size-8 text-base-content/70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.447 9.756c.028.05.053.113.078.186-.028-.06-.047-.129-.078-.186.592 2.304-1.95 5.003-5.13 4.239h.001c4.596-3.01 2.332-6.772.19-8.58-1.762-1.49-.721-1.95.021-1.95.237 0 .443.046.519.121l-.005-.004.006.004c-.018-1.433-5.066-1.11-.65 3.494 2.268 2.365-.408 7.596-3.596 3.618a.974.974 0 0 1-.071-.113c.515-.214.937-.795.937-1.753a2.383 2.383 0 0 0-.197-.986c.368-.75.707-1.647.707-2.77 0-2.684-1.742-5.076-4.18-5.076s-4.18 2.392-4.18 5.076c0 1.123.339 2.02.707 2.771a2.374 2.374 0 0 0-.197.988c0 .958.421 1.54.937 1.753a.985.985 0 0 1-.072.113C6.006 14.679 3.33 9.447 5.598 7.083c4.417-4.604-.633-4.926-.651-3.494l.008-.004c.078-.074.28-.12.515-.12.742 0 1.783.46.021 1.95-2.133 1.8-4.383 5.538.139 8.542.018.013.03.027.049.04-3.176.764-5.714-1.928-5.131-4.232l.004-.01c-.001.002-.002.005-.004.006l.001-.003-.003.007c-1.174 1.61-.606 5.779 3.778 6.168.019.003.035.009.054.012-4.36 1-3.048 7.02.021 6.056L4.388 22l.016-.003C2.27 21.652 2.11 19 3.176 18.087c1.172-1.006 2.519-.137 5.302-.932l.03-.004c-.03 2.446 2.352 3.76 1.103 5.16-1.316 1.473-3.112-.1-2.858-1.55l.006-.029-.004.008v-.004l-.004.012C5.65 22.598 7.044 24 8.61 24c.899 0 1.855-.462 2.429-1.567 1.214-2.337-2.385-6.432.96-6.432 3.344 0-.255 4.095.959 6.432.574 1.105 1.53 1.567 2.43 1.567 1.571 0 2.97-1.411 1.85-3.268l.005.021-.006-.017c.276 1.457-1.533 3.057-2.855 1.575-1.244-1.404 1.131-2.718 1.106-5.163 2.806.812 4.157-.072 5.334.94 1.066.911.906 3.564-1.228 3.91h.007c3.07.958 4.377-5.054.018-6.057l.005-.001c4.44-.362 5.009-4.573 3.822-6.184zm-11.263 1.628c0 .749-.06 1.356-.133 1.356s-.126-.605-.125-1.355c0-.75.062-1.356.133-1.356.07 0 .128.606.125 1.355zm-.952-1.614c.056 0 .1.73.1 1.631s-.044 1.631-.1 1.631-.1-.73-.1-1.63c0-.902.045-1.632.1-1.632z"/>
              </svg>
              <span className="text-xs text-base-content/70">RTL</span>
            </div>
            {/* Bun */}
            <div className="flex flex-col items-center gap-2">
              <svg className="size-8 text-base-content/70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 22.596c6.628 0 12-4.338 12-9.688 0-3.318-2.057-6.248-5.219-7.986-1.286-.715-2.297-1.357-3.139-1.89C14.058 2.025 13.08 1.404 12 1.404c-1.097 0-2.334.785-3.966 1.821a49.92 49.92 0 0 1-2.816 1.697C2.057 6.66 0 9.59 0 12.908c0 5.35 5.372 9.687 12 9.687v.001ZM10.599 4.715c.334-.759.503-1.58.498-2.409 0-.145.202-.187.23-.029.658 2.783-.902 4.162-2.057 4.624-.124.048-.199-.121-.103-.209a5.763 5.763 0 0 0 1.432-1.977Zm2.058-.102a5.82 5.82 0 0 0-.782-2.306v-.016c-.069-.123.086-.263.185-.172 1.962 2.111 1.307 4.067.556 5.051-.082.103-.23-.003-.189-.126a5.85 5.85 0 0 0 .23-2.431Zm1.776-.561a5.727 5.727 0 0 0-1.612-1.806v-.014c-.112-.085-.024-.274.114-.218 2.595 1.087 2.774 3.18 2.459 4.407a.116.116 0 0 1-.049.071.11.11 0 0 1-.153-.026.122.122 0 0 1-.022-.083a5.891 5.891 0 0 0-.737-2.331Zm-5.087.561c-.617.546-1.282.76-2.063 1-.117 0-.195-.078-.156-.181 1.752-.909 2.376-1.649 2.999-2.778 0 0 .155-.118.188.085 0 .304-.349 1.329-.968 1.874Zm4.945 11.237a2.957 2.957 0 0 1-.937 1.553c-.346.346-.8.565-1.286.62a2.178 2.178 0 0 1-1.327-.62 2.955 2.955 0 0 1-.925-1.553.244.244 0 0 1 .064-.198.234.234 0 0 1 .193-.069h3.965a.226.226 0 0 1 .19.07c.05.053.073.125.063.197Zm-5.458-2.176a1.862 1.862 0 0 1-2.384-.245 1.98 1.98 0 0 1-.233-2.447c.207-.319.503-.566.848-.713a1.84 1.84 0 0 1 1.092-.11c.366.075.703.261.967.531a1.98 1.98 0 0 1 .408 2.114 1.931 1.931 0 0 1-.698.869v.001Zm8.495.005a1.86 1.86 0 0 1-2.381-.253 1.964 1.964 0 0 1-.547-1.366c0-.384.11-.76.32-1.079.207-.319.503-.567.849-.713a1.844 1.844 0 0 1 1.093-.108c.367.076.704.262.968.534a1.98 1.98 0 0 1 .4 2.117 1.932 1.932 0 0 1-.702.868Z"/>
              </svg>
              <span className="text-xs text-base-content/70">Bun</span>
            </div>
          </div>
        </section>


        {/* What's Inside */}
        <section className="mb-20">
          <h2 className="text-lg font-semibold mb-4 text-balance">What's Inside</h2>
          <p className="text-base-content/70 mb-6 text-pretty">
            Files that tell Claude how to help you. Click to peek inside.
          </p>

          <div className="space-y-3">
            <FilePreview
              filename="CLAUDE.md"
              description="Claude reads this first — your project's brain dump"
              content={`# claudecraft

## Quick Reference
- Framework: React 18 + TypeScript
- Styling: Tailwind CSS + DaisyUI
- Build Tool: Vite
- Package Manager: Bun

## Styling Guidelines

### DO ✅
- Use DaisyUI component classes (btn, card, input)
- Use semantic colors (bg-base-100, text-primary)
- Keep it minimal: whitespace, subtle shadows

### DON'T ❌
- No excessive gradients
- No fake glows or heavy shadows
- Don't forget accessibility

## Common Mistakes to Avoid
❌ Don't use inline styles when Tailwind classes exist
❌ Don't hardcode colors like text-[#333]
❌ Don't forget loading and error states
✅ Use semantic colors: text-base-content
✅ Handle all UI states`}
            />

            <FilePreview
              filename=".claude/skills/ui-skills/SKILL.md"
              description="Rules for building interfaces that don't suck"
              content={`# UI Skills

## Layout
- Use min-h-dvh not min-h-screen (mobile Safari)
- Use text-balance for headings
- Use text-pretty for body copy

## Accessibility
- Every interactive element needs focus states
- Icon buttons need aria-label
- Forms need proper labels

## Responsive
- Mobile-first breakpoints
- Touch targets minimum 44x44px
- Test with actual devices`}
            />

            <FilePreview
              filename=".claude/commands/build.md"
              description="What /build actually does"
              content={`# /build

Run the build and report results.

\`\`\`bash
bun run build 2>&1
\`\`\`

## On success
Report: "Build completed successfully"

## On failure
List each error with:
- File path and line number
- Error message
- Suggested fix if obvious`}
            />

            <FilePreview
              filename=".claude/settings.local.json"
              description="Pre-approved commands so Claude can actually do stuff"
              content={`{
  "permissions": {
    "allow": [
      "Bash(bun:*)",
      "Bash(git:*)",
      "Bash(rm:-rf node_modules)",
      "Bash(bunx:*)",
      "Bash(open:*)",
      "Bash(cat:*)",
      "Bash(ls:*)"
    ]
  }
}`}
            />
          </div>
        </section>

        {/* Commands */}
        <section className="mb-20">
          <h2 className="text-lg font-semibold mb-4 text-balance">7 Commands</h2>
          <p className="text-base-content/70 mb-6 text-pretty">
            Slash commands for when you want Claude to do something specific instead of whatever it was planning.
          </p>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-base-content/80">/build</span>
              <span className="text-base-content/50">compile and pray</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-base-content/80">/typecheck</span>
              <span className="text-base-content/50">find the lies in your types</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-base-content/80">/lint</span>
              <span className="text-base-content/50">formatting crimes detected</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-base-content/80">/brainstorm</span>
              <span className="text-base-content/50">Socratic interrogation of your ideas</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-base-content/80">/write-plan</span>
              <span className="text-base-content/50">plan before you regret</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-base-content/80">/execute-plan</span>
              <span className="text-base-content/50">actually do the thing</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="font-mono text-base-content/80">/ralph</span>
              <span className="text-base-content/50">autonomous loop templates</span>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-20">
          <h2 className="text-lg font-semibold mb-4 text-balance">26 Skills Included</h2>
          <p className="text-base-content/70 mb-6 text-pretty">
            Skills are behavioral guardrails. They stop Claude from doing that thing you hate.
          </p>

          {/* Superpowers */}
          <h3 className="text-sm font-medium text-base-content/50 mb-3 mt-6">Development Workflow</h3>
          <p className="text-xs text-base-content/40 mb-4">
            From{' '}
            <a href="https://github.com/obra/superpowers" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
              obra/superpowers
            </a>
            {' '}— the "think before you code" collection.
          </p>
          <div className="space-y-2 text-sm mb-8">
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">brainstorming</span>
              <span className="text-base-content/50">question everything first</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">writing-plans</span>
              <span className="text-base-content/50">break it down or break down</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">executing-plans</span>
              <span className="text-base-content/50">checkpoints for the anxious</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">test-driven-development</span>
              <span className="text-base-content/50">red, green, refactor, repeat</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">systematic-debugging</span>
              <span className="text-base-content/50">4 phases of grief resolution</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">verification-before-completion</span>
              <span className="text-base-content/50">trust but verify</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">requesting-code-review</span>
              <span className="text-base-content/50">prepare for judgment</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">receiving-code-review</span>
              <span className="text-base-content/50">accept feedback gracefully</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">using-git-worktrees</span>
              <span className="text-base-content/50">branch isolation therapy</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">finishing-a-development-branch</span>
              <span className="text-base-content/50">actually merge for once</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">subagent-driven-development</span>
              <span className="text-base-content/50">delegate to your clones</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">dispatching-parallel-agents</span>
              <span className="text-base-content/50">multitask like you pretend to</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">writing-skills</span>
              <span className="text-base-content/50">teach Claude new tricks</span>
            </div>
          </div>

          {/* Design & Quality */}
          <h3 className="text-sm font-medium text-base-content/50 mb-3">Design & Quality</h3>
          <p className="text-xs text-base-content/40 mb-4">
            The "make it not suck" collection.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">
                react-best-practices
                <a href="https://vercel.com/design/guidelines" target="_blank" rel="noopener noreferrer" className="text-base-content/40 hover:text-primary ml-2 text-xs">
                  via Vercel
                </a>
              </span>
              <span className="text-base-content/50">avoid re-render hell</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">
                testing-patterns
                <a href="https://github.com/ChrisWiles/claude-code-showcase" target="_blank" rel="noopener noreferrer" className="text-base-content/40 hover:text-primary ml-2 text-xs">
                  via ChrisWiles
                </a>
              </span>
              <span className="text-base-content/50">tests that find bugs, not LOC</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">
                ui-skills
                <a href="https://www.ui-skills.com/" target="_blank" rel="noopener noreferrer" className="text-base-content/40 hover:text-primary ml-2 text-xs">
                  via ui-skills.com
                </a>
              </span>
              <span className="text-base-content/50">CSS that doesn't fight back</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">
                a11y-audit
                <a href="https://claude-plugins.dev/skills/@daffy0208/ai-dev-standards/accessibility-engineer" target="_blank" rel="noopener noreferrer" className="text-base-content/40 hover:text-primary ml-2 text-xs">
                  via daffy0208
                </a>
              </span>
              <span className="text-base-content/50">guilt-powered WCAG compliance</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">seo-review</span>
              <span className="text-base-content/50">appease the algorithm gods</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">og-image</span>
              <span className="text-base-content/50">social cards that get clicks</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">microcopy</span>
              <span className="text-base-content/50">words that don't annoy users</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">sitemap-generator</span>
              <span className="text-base-content/50">feed the crawlers</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">json-ld</span>
              <span className="text-base-content/50">structured data for robots</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">design-polish</span>
              <span className="text-base-content/50">systematic polish passes</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80">visual-iteration</span>
              <span className="text-base-content/50">mockup to code loop</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-base-content/80 font-semibold">ralph-wiggum-loops</span>
              <span className="text-base-content/50">overnight builds</span>
            </div>
          </div>
        </section>


        {/* Ralph Wiggum */}
        <section className="mb-20">
          <h2 className="text-lg font-semibold mb-4 text-balance">The Superpower: Ralph Loops</h2>
          <p className="text-base-content/70 mb-6 text-pretty">
            The ultimate designer trick. Ralph Wiggum loops let Claude work autonomously—building, checking, fixing—until the task is done. Walk away. Come back to finished work.
          </p>

          <div className="bg-base-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-base-content/80 mb-3">
              <strong>How it works:</strong> You give Claude a task. It works, checks itself, fixes errors, repeats. Each iteration builds on the last until completion.
            </p>
            <CodeBlock>{`/ralph-loop "Build a card component with hover states"
  --completion-promise "COMPLETE"
  --max-iterations 15`}</CodeBlock>
          </div>

          <p className="text-sm text-base-content/50">
            Real results: YC teams shipped 6 repos overnight. $50k contracts completed for $297 in API costs.
          </p>
        </section>


        {/* UI */}
        <section className="mb-20">
          <h2 className="text-lg font-semibold mb-4 text-balance">32 Themes</h2>
          <p className="text-base-content/70 mb-6 text-pretty">
            DaisyUI ships with 32 pre-built themes. Pick one and everything updates.
          </p>
          <UICarousel />
        </section>


        {/* Structure */}
        <section className="mb-20">
          <h2 className="text-lg font-semibold mb-6 text-balance">Structure</h2>
          <CodeBlock>{`.claude/
├── commands/           # /build, /lint, /ralph, etc.
├── hooks/              # typecheck-after-edit, check-branch
├── skills/             # 26 skills for keeping Claude in line
├── settings.json       # hooks config
└── settings.local.json # permissions (pre-approved chaos)

src/
├── components/ui/      # Button, ThemeSelector, CodeBlock
├── context/            # ThemeContext
├── pages/              # HomePage
└── lib/                # utils (cn)

CLAUDE.md               # project context`}</CodeBlock>
        </section>


        {/* Why */}
        <section className="mb-20">
          <h2 className="text-lg font-semibold mb-6 text-balance">Why</h2>
          <p className="text-base-content/80 mb-6 text-pretty">
            Claude reads everything. Might as well give it something worth reading.
          </p>
          <ul className="space-y-2 text-base-content/80">
            <li>— Clear documentation in CLAUDE.md</li>
            <li>— Pre-built skills for common workflows</li>
            <li>— Safe permission defaults</li>
            <li>— Automatic hooks (type-checking)</li>
            <li>— Minimal UI across 32 themes</li>
          </ul>
          <p className="text-base-content/50 mt-8">
            The robots are here. Make them useful.
          </p>
        </section>


        {/* Footer */}
        <footer className="pt-10 border-t border-base-200 text-sm text-base-content/40">
          <div className="flex items-center justify-between">
            <span>Made by a designer who got tired of the slop</span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/raduceuca/claudecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-base-content/60"
              >
                GitHub
              </a>
              <a
                href="https://x.com/raduceuca"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-base-content/60"
              >
                @raduceuca
              </a>
            </div>
          </div>
        </footer>

      </article>
    </div>
  )
}
