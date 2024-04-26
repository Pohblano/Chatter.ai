import * as React from 'react'


function IconNextChat({
  className,
  inverted,
  ...props
}: React.ComponentProps<'svg'> & { inverted?: boolean }) {
  const id = React.useId()

  return (
    <svg
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      //   className={cn('size-4', className)}
      {...props}
    >
      <defs>
        <linearGradient
          id={`gradient-${id}-1`}
          x1="10.6889"
          y1="10.3556"
          x2="13.8445"
          y2="14.2667"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={inverted ? 'white' : 'black'} />
          <stop
            offset={1}
            stopColor={inverted ? 'white' : 'black'}
            stopOpacity={0}
          />
        </linearGradient>
        <linearGradient
          id={`gradient-${id}-2`}
          x1="11.7555"
          y1="4.8"
          x2="11.7376"
          y2="9.50002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={inverted ? 'white' : 'black'} />
          <stop
            offset={1}
            stopColor={inverted ? 'white' : 'black'}
            stopOpacity={0}
          />
        </linearGradient>
      </defs>
      <path
        d="M1 16L2.58314 11.2506C1.83084 9.74642 1.63835 8.02363 2.04013 6.39052C2.4419 4.75741 3.41171 3.32057 4.776 2.33712C6.1403 1.35367 7.81003 0.887808 9.4864 1.02289C11.1628 1.15798 12.7364 1.8852 13.9256 3.07442C15.1148 4.26363 15.842 5.83723 15.9771 7.5136C16.1122 9.18997 15.6463 10.8597 14.6629 12.224C13.6794 13.5883 12.2426 14.5581 10.6095 14.9599C8.97637 15.3616 7.25358 15.1692 5.74942 14.4169L1 16Z"
        fill={inverted ? 'black' : 'white'}
        stroke={inverted ? 'black' : 'white'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask
        id="mask0_91_2047"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x={1}
        y={0}
        width={16}
        height={16}
      >
        <circle cx={9} cy={8} r={8} fill={inverted ? 'black' : 'white'} />
      </mask>
      <g mask="url(#mask0_91_2047)">
        <circle cx={9} cy={8} r={8} fill={inverted ? 'black' : 'white'} />
        <path
          d="M14.2896 14.0018L7.146 4.8H5.80005V11.1973H6.87681V6.16743L13.4444 14.6529C13.7407 14.4545 14.0231 14.2369 14.2896 14.0018Z"
          fill={`url(#gradient-${id}-1)`}
        />
        <rect
          x="11.2222"
          y="4.8"
          width="1.06667"
          height="6.4"
          fill={`url(#gradient-${id}-2)`}
        />
      </g>
    </svg>
  )
}

function IconOpenAI({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      //   className={cn('size-4', className)}
      {...props}
    >
      <title>OpenAI icon</title>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  )
}

function IconVercel({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      aria-label="Vercel logomark"
      role="img"
      viewBox="0 0 74 64"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path
        d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

function IconGitHub({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

function IconSeparator({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="none"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1"
      viewBox="0 0 24 24"
      aria-hidden="true"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M16.88 3.549L7.12 20.451"></path>
    </svg>
  )
}

function IconArrowDown({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="m205.66 149.66-72 72a8 8 0 0 1-11.32 0l-72-72a8 8 0 0 1 11.32-11.32L120 196.69V40a8 8 0 0 1 16 0v156.69l58.34-58.35a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

function IconArrowRight({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z" />
    </svg>
  )
}

function IconUser({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8ZM72 96a56 56 0 1 1 56 56 56.06 56.06 0 0 1-56-56Z" />
    </svg>
  )
}

function IconPlus({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M224 128a8 8 0 0 1-8 8h-80v80a8 8 0 0 1-16 0v-80H40a8 8 0 0 1 0-16h80V40a8 8 0 0 1 16 0v80h80a8 8 0 0 1 8 8Z" />
    </svg>
  )
}

function IconArrowElbow({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z" />
    </svg>
  )
}

function IconSpinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4 animate-spin', className)}
      {...props}
    >
      <path d="M232 128a104 104 0 0 1-208 0c0-41 23.81-78.36 60.66-95.27a8 8 0 0 1 6.68 14.54C60.15 61.59 40 93.27 40 128a88 88 0 0 0 176 0c0-34.73-20.15-66.41-51.34-80.73a8 8 0 0 1 6.68-14.54C208.19 49.64 232 87 232 128Z" />
    </svg>
  )
}

function IconMessage({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M216 48H40a16 16 0 0 0-16 16v160a15.84 15.84 0 0 0 9.25 14.5A16.05 16.05 0 0 0 40 240a15.89 15.89 0 0 0 10.25-3.78.69.69 0 0 0 .13-.11L82.5 208H216a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16ZM40 224Zm176-32H82.5a16 16 0 0 0-10.3 3.75l-.12.11L40 224V64h176Z" />
    </svg>
  )
}

function IconTrash({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z" />
    </svg>
  )
}

function IconRefresh({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M197.67 186.37a8 8 0 0 1 0 11.29C196.58 198.73 170.82 224 128 224c-37.39 0-64.53-22.4-80-39.85V208a8 8 0 0 1-16 0v-48a8 8 0 0 1 8-8h48a8 8 0 0 1 0 16H55.44C67.76 183.35 93 208 128 208c36 0 58.14-21.46 58.36-21.68a8 8 0 0 1 11.31.05ZM216 40a8 8 0 0 0-8 8v23.85C192.53 54.4 165.39 32 128 32c-42.82 0-68.58 25.27-69.66 26.34a8 8 0 0 0 11.3 11.34C69.86 69.46 92 48 128 48c35 0 60.24 24.65 72.56 40H168a8 8 0 0 0 0 16h48a8 8 0 0 0 8-8V48a8 8 0 0 0-8-8Z" />
    </svg>
  )
}

function IconStop({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm0 192a88 88 0 1 1 88-88 88.1 88.1 0 0 1-88 88Zm24-120h-48a8 8 0 0 0-8 8v48a8 8 0 0 0 8 8h48a8 8 0 0 0 8-8v-48a8 8 0 0 0-8-8Zm-8 48h-32v-32h32Z" />
    </svg>
  )
}

function IconSidebar({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16ZM40 56h40v144H40Zm176 144H96V56h120v144Z" />
    </svg>
  )
}

function IconMoon({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M233.54 142.23a8 8 0 0 0-8-2 88.08 88.08 0 0 1-109.8-109.8 8 8 0 0 0-10-10 104.84 104.84 0 0 0-52.91 37A104 104 0 0 0 136 224a103.09 103.09 0 0 0 62.52-20.88 104.84 104.84 0 0 0 37-52.91 8 8 0 0 0-1.98-7.98Zm-44.64 48.11A88 88 0 0 1 65.66 67.11a89 89 0 0 1 31.4-26A106 106 0 0 0 96 56a104.11 104.11 0 0 0 104 104 106 106 0 0 0 14.92-1.06 89 89 0 0 1-26.02 31.4Z" />
    </svg>
  )
}

function IconSun({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M120 40V16a8 8 0 0 1 16 0v24a8 8 0 0 1-16 0Zm72 88a64 64 0 1 1-64-64 64.07 64.07 0 0 1 64 64Zm-16 0a48 48 0 1 0-48 48 48.05 48.05 0 0 0 48-48ZM58.34 69.66a8 8 0 0 0 11.32-11.32l-16-16a8 8 0 0 0-11.32 11.32Zm0 116.68-16 16a8 8 0 0 0 11.32 11.32l16-16a8 8 0 0 0-11.32-11.32ZM192 72a8 8 0 0 0 5.66-2.34l16-16a8 8 0 0 0-11.32-11.32l-16 16A8 8 0 0 0 192 72Zm5.66 114.34a8 8 0 0 0-11.32 11.32l16 16a8 8 0 0 0 11.32-11.32ZM48 128a8 8 0 0 0-8-8H16a8 8 0 0 0 0 16h24a8 8 0 0 0 8-8Zm80 80a8 8 0 0 0-8 8v24a8 8 0 0 0 16 0v-24a8 8 0 0 0-8-8Zm112-88h-24a8 8 0 0 0 0 16h24a8 8 0 0 0 0-16Z" />
    </svg>
  )
}

function IconCopy({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M216 32H88a8 8 0 0 0-8 8v40H40a8 8 0 0 0-8 8v128a8 8 0 0 0 8 8h128a8 8 0 0 0 8-8v-40h40a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8Zm-56 176H48V96h112Zm48-48h-32V88a8 8 0 0 0-8-8H96V48h112Z" />
    </svg>
  )
}

function IconCheck({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="m229.66 77.66-128 128a8 8 0 0 1-11.32 0l-56-56a8 8 0 0 1 11.32-11.32L96 188.69 218.34 66.34a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  )
}

function IconDownload({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M224 152v56a16 16 0 0 1-16 16H48a16 16 0 0 1-16-16v-56a8 8 0 0 1 16 0v56h160v-56a8 8 0 0 1 16 0Zm-101.66 5.66a8 8 0 0 0 11.32 0l40-40a8 8 0 0 0-11.32-11.32L136 132.69V40a8 8 0 0 0-16 0v92.69l-26.34-26.35a8 8 0 0 0-11.32 11.32Z" />
    </svg>
  )
}

function IconClose({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128 50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" />
    </svg>
  )
}

function IconEdit({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      //   className={cn('size-4', className)}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  )
}

function IconShare({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      //   className={cn('size-4', className)}
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="m237.66 106.35-80-80A8 8 0 0 0 144 32v40.35c-25.94 2.22-54.59 14.92-78.16 34.91-28.38 24.08-46.05 55.11-49.76 87.37a12 12 0 0 0 20.68 9.58c11-11.71 50.14-48.74 107.24-52V192a8 8 0 0 0 13.66 5.65l80-80a8 8 0 0 0 0-11.3ZM160 172.69V144a8 8 0 0 0-8-8c-28.08 0-55.43 7.33-81.29 21.8a196.17 196.17 0 0 0-36.57 26.52c5.8-23.84 20.42-46.51 42.05-64.86C99.41 99.77 127.75 88 152 88a8 8 0 0 0 8-8V51.32L220.69 112Z" />
    </svg>
  )
}

function IconUsers({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      //   className={cn('size-4', className)}
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M117.25 157.92a60 60 0 1 0-66.5 0 95.83 95.83 0 0 0-47.22 37.71 8 8 0 1 0 13.4 8.74 80 80 0 0 1 134.14 0 8 8 0 0 0 13.4-8.74 95.83 95.83 0 0 0-47.22-37.71ZM40 108a44 44 0 1 1 44 44 44.05 44.05 0 0 1-44-44Zm210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16 44 44 0 1 0-16.34-84.87 8 8 0 1 1-5.94-14.85 60 60 0 0 1 55.53 105.64 95.83 95.83 0 0 1 47.22 37.71 8 8 0 0 1-2.33 11.07Z" />
    </svg>
  )
}

function IconExternalLink({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      //   className={cn('size-4', className)}
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M224 104a8 8 0 0 1-16 0V59.32l-66.33 66.34a8 8 0 0 1-11.32-11.32L196.68 48H152a8 8 0 0 1 0-16h64a8 8 0 0 1 8 8Zm-40 24a8 8 0 0 0-8 8v72H48V80h72a8 8 0 0 0 0-16H48a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-72a8 8 0 0 0-8-8Z" />
    </svg>
  )
}

function IconChevronUpDown({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      //   className={cn('size-4', className)}
      viewBox="0 0 256 256"
      {...props}
    >
      <path d="M181.66 170.34a8 8 0 0 1 0 11.32l-48 48a8 8 0 0 1-11.32 0l-48-48a8 8 0 0 1 11.32-11.32L128 212.69l42.34-42.35a8 8 0 0 1 11.32 0Zm-96-84.68L128 43.31l42.34 42.35a8 8 0 0 0 11.32-11.32l-48-48a8 8 0 0 0-11.32 0l-48 48a8 8 0 0 0 11.32 11.32Z" />
    </svg>
  )
}

function IconQuestionCircle({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg className=" w-5 h-5" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8.40848 11.7416C8.37264 11.7812 8.33925 11.823 8.30848 11.8666C8.27694 11.9131 8.25172 11.9635 8.23348 12.0166C8.20945 12.0639 8.1926 12.1144 8.18348 12.1666C8.17939 12.2221 8.17939 12.2778 8.18348 12.3333C8.18066 12.4426 8.2035 12.5511 8.25015 12.65C8.28757 12.7534 8.34728 12.8473 8.42505 12.9251C8.50282 13.0028 8.59673 13.0625 8.70015 13.1C8.7999 13.144 8.90775 13.1668 9.01681 13.1668C9.12587 13.1668 9.23373 13.144 9.33348 13.1C9.43689 13.0625 9.53081 13.0028 9.60857 12.9251C9.68634 12.8473 9.74605 12.7534 9.78348 12.65C9.82048 12.5486 9.83746 12.4411 9.83348 12.3333C9.83411 12.2236 9.81309 12.1149 9.77162 12.0134C9.73015 11.9118 9.66905 11.8195 9.59181 11.7416C9.51434 11.6635 9.42218 11.6015 9.32063 11.5592C9.21908 11.5169 9.11016 11.4951 9.00015 11.4951C8.89014 11.4951 8.78121 11.5169 8.67966 11.5592C8.57812 11.6015 8.48595 11.6635 8.40848 11.7416ZM9.00015 0.666626C7.35197 0.666626 5.7408 1.15537 4.37039 2.07105C2.99998 2.98672 1.93188 4.28821 1.30115 5.81093C0.67042 7.33365 0.505392 9.0092 0.826935 10.6257C1.14848 12.2422 1.94215 13.7271 3.10759 14.8925C4.27303 16.058 5.75788 16.8516 7.37439 17.1732C8.9909 17.4947 10.6665 17.3297 12.1892 16.699C13.7119 16.0682 15.0134 15.0001 15.9291 13.6297C16.8447 12.2593 17.3335 10.6481 17.3335 8.99996C17.3335 7.90561 17.1179 6.82198 16.6991 5.81093C16.2804 4.79988 15.6665 3.88122 14.8927 3.1074C14.1189 2.33358 13.2002 1.71975 12.1892 1.30096C11.1781 0.882174 10.0945 0.666626 9.00015 0.666626ZM9.00015 15.6666C7.6816 15.6666 6.39267 15.2756 5.29634 14.5431C4.20002 13.8105 3.34553 12.7694 2.84095 11.5512C2.33637 10.333 2.20434 8.99256 2.46158 7.69936C2.71881 6.40615 3.35375 5.21826 4.2861 4.28591C5.21845 3.35356 6.40634 2.71863 7.69954 2.46139C8.99275 2.20416 10.3332 2.33618 11.5514 2.84076C12.7695 3.34535 13.8107 4.19983 14.5433 5.29616C15.2758 6.39249 15.6668 7.68142 15.6668 8.99996C15.6668 10.7681 14.9644 12.4638 13.7142 13.714C12.4639 14.9642 10.7683 15.6666 9.00015 15.6666ZM9.00015 4.83329C8.56103 4.83301 8.12959 4.94839 7.74924 5.16783C7.36888 5.38726 7.05304 5.70301 6.83348 6.08329C6.77318 6.17814 6.7327 6.28421 6.71446 6.39511C6.69622 6.50601 6.7006 6.61945 6.72734 6.72861C6.75408 6.83778 6.80262 6.94041 6.87005 7.03032C6.93748 7.12024 7.0224 7.19558 7.1197 7.25183C7.21701 7.30808 7.32469 7.34406 7.43626 7.35761C7.54783 7.37116 7.66099 7.362 7.76893 7.33069C7.87687 7.29938 7.97736 7.24655 8.06435 7.17539C8.15135 7.10423 8.22305 7.01621 8.27515 6.91663C8.34857 6.78946 8.45429 6.68394 8.5816 6.61077C8.70892 6.53761 8.8533 6.49938 9.00015 6.49996C9.22116 6.49996 9.43312 6.58776 9.5894 6.74404C9.74568 6.90032 9.83348 7.11228 9.83348 7.33329C9.83348 7.55431 9.74568 7.76627 9.5894 7.92255C9.43312 8.07883 9.22116 8.16663 9.00015 8.16663C8.77913 8.16663 8.56717 8.25442 8.41089 8.4107C8.25461 8.56698 8.16681 8.77895 8.16681 8.99996V9.83329C8.16681 10.0543 8.25461 10.2663 8.41089 10.4225C8.56717 10.5788 8.77913 10.6666 9.00015 10.6666C9.22116 10.6666 9.43312 10.5788 9.5894 10.4225C9.74568 10.2663 9.83348 10.0543 9.83348 9.83329V9.68329C10.3846 9.48331 10.8479 9.09598 11.1425 8.58902C11.437 8.08205 11.5439 7.4877 11.4446 6.90987C11.3454 6.33203 11.0461 5.80747 10.5993 5.42789C10.1525 5.0483 9.58643 4.83784 9.00015 4.83329Z" fill="currentColor"></path>
    </svg>
  )
}


function IconOpenFile({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg className=" w-5 h-5" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M18.9832 6.64169C18.9048 6.545 18.8057 6.46712 18.6932 6.41376C18.5807 6.36041 18.4577 6.33293 18.3332 6.33335H16.6665V5.50002C16.6665 4.83698 16.4031 4.20109 15.9343 3.73225C15.4655 3.26341 14.8296 3.00002 14.1665 3.00002H8.93319L8.66652 2.16669C8.49365 1.67771 8.17298 1.2546 7.74894 0.955986C7.3249 0.657367 6.81849 0.498019 6.29986 0.500019H3.33319C2.67015 0.500019 2.03426 0.763411 1.56542 1.23225C1.09658 1.70109 0.833191 2.33698 0.833191 3.00002V13C0.833191 13.6631 1.09658 14.2989 1.56542 14.7678C2.03426 15.2366 2.67015 15.5 3.33319 15.5H15.3332C15.9009 15.4984 16.4511 15.3036 16.8933 14.9476C17.3356 14.5917 17.6435 14.0959 17.7665 13.5417L19.1665 7.35002C19.1919 7.22578 19.1885 7.0974 19.1568 6.97466C19.125 6.85191 19.0656 6.73803 18.9832 6.64169ZM4.47486 13.1834C4.43252 13.3713 4.32635 13.5388 4.17441 13.6574C4.02247 13.7759 3.83416 13.8381 3.64152 13.8334H3.33319C3.11218 13.8334 2.90022 13.7456 2.74394 13.5893C2.58765 13.433 2.49986 13.221 2.49986 13V3.00002C2.49986 2.779 2.58765 2.56704 2.74394 2.41076C2.90022 2.25448 3.11218 2.16669 3.33319 2.16669H6.29986C6.48158 2.1572 6.66141 2.20746 6.81189 2.30978C6.96236 2.4121 7.07521 2.56087 7.13319 2.73335L7.58319 4.10002C7.63667 4.25897 7.73686 4.39809 7.87067 4.49919C8.00447 4.60029 8.16567 4.65867 8.33319 4.66669H14.1665C14.3875 4.66669 14.5995 4.75448 14.7558 4.91076C14.9121 5.06704 14.9999 5.27901 14.9999 5.50002V6.33335H6.66652C6.47389 6.32864 6.28558 6.39084 6.13364 6.50935C5.9817 6.62786 5.87553 6.79537 5.83319 6.98335L4.47486 13.1834ZM16.1415 13.1834C16.0992 13.3713 15.993 13.5388 15.8411 13.6574C15.6891 13.7759 15.5008 13.8381 15.3082 13.8334H6.00819C6.05123 13.7405 6.08204 13.6425 6.09986 13.5417L7.33319 8.00002H17.3332L16.1415 13.1834Z" fill="currentColor"></path>
    </svg>
  )
}

function IconList({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg className=" w-5 h-5" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M2.09182 8.575C2.01257 8.49913 1.91911 8.43966 1.81682 8.4C1.61394 8.31665 1.38637 8.31665 1.18349 8.4C1.08119 8.43966 0.98774 8.49913 0.908486 8.575C0.832619 8.65425 0.773148 8.74771 0.733486 8.85C0.66967 9.00176 0.652235 9.16902 0.68338 9.33068C0.714525 9.49234 0.792855 9.64115 0.908486 9.75833C0.989487 9.83194 1.0825 9.89113 1.18349 9.93333C1.28324 9.97742 1.39109 10.0002 1.50015 10.0002C1.60921 10.0002 1.71707 9.97742 1.81682 9.93333C1.91781 9.89113 2.01082 9.83194 2.09182 9.75833C2.20745 9.64115 2.28578 9.49234 2.31693 9.33068C2.34807 9.16902 2.33064 9.00176 2.26682 8.85C2.22716 8.74771 2.16769 8.65425 2.09182 8.575ZM4.83349 1.66667H16.5002C16.7212 1.66667 16.9331 1.57887 17.0894 1.42259C17.2457 1.26631 17.3335 1.05435 17.3335 0.833333C17.3335 0.61232 17.2457 0.400358 17.0894 0.244078C16.9331 0.0877975 16.7212 0 16.5002 0H4.83349C4.61247 0 4.40051 0.0877975 4.24423 0.244078C4.08795 0.400358 4.00015 0.61232 4.00015 0.833333C4.00015 1.05435 4.08795 1.26631 4.24423 1.42259C4.40051 1.57887 4.61247 1.66667 4.83349 1.66667ZM2.09182 4.40833C1.97463 4.2927 1.82582 4.21437 1.66416 4.18323C1.50251 4.15208 1.33525 4.16952 1.18349 4.23333C1.0825 4.27554 0.989487 4.33472 0.908486 4.40833C0.832619 4.48759 0.773148 4.58104 0.733486 4.68333C0.689399 4.78308 0.666626 4.89094 0.666626 5C0.666626 5.10906 0.689399 5.21692 0.733486 5.31667C0.775688 5.41765 0.834877 5.51067 0.908486 5.59167C0.989487 5.66528 1.0825 5.72447 1.18349 5.76667C1.28324 5.81075 1.39109 5.83353 1.50015 5.83353C1.60921 5.83353 1.71707 5.81075 1.81682 5.76667C1.91781 5.72447 2.01082 5.66528 2.09182 5.59167C2.16543 5.51067 2.22462 5.41765 2.26682 5.31667C2.31091 5.21692 2.33368 5.10906 2.33368 5C2.33368 4.89094 2.31091 4.78308 2.26682 4.68333C2.22716 4.58104 2.16769 4.48759 2.09182 4.40833ZM16.5002 4.16667H4.83349C4.61247 4.16667 4.40051 4.25446 4.24423 4.41074C4.08795 4.56703 4.00015 4.77899 4.00015 5C4.00015 5.22101 4.08795 5.43298 4.24423 5.58926C4.40051 5.74554 4.61247 5.83333 4.83349 5.83333H16.5002C16.7212 5.83333 16.9331 5.74554 17.0894 5.58926C17.2457 5.43298 17.3335 5.22101 17.3335 5C17.3335 4.77899 17.2457 4.56703 17.0894 4.41074C16.9331 4.25446 16.7212 4.16667 16.5002 4.16667ZM2.09182 0.241667C2.01257 0.165799 1.91911 0.106329 1.81682 0.0666666C1.66506 0.00285041 1.4978 -0.0145849 1.33614 0.0165602C1.17448 0.0477053 1.02567 0.126035 0.908486 0.241667C0.834877 0.322667 0.775688 0.415679 0.733486 0.516667C0.689399 0.616417 0.666626 0.724274 0.666626 0.833333C0.666626 0.942392 0.689399 1.05025 0.733486 1.15C0.775688 1.25099 0.834877 1.344 0.908486 1.425C0.989487 1.49861 1.0825 1.5578 1.18349 1.6C1.33525 1.66382 1.50251 1.68125 1.66416 1.65011C1.82582 1.61896 1.97463 1.54063 2.09182 1.425C2.16543 1.344 2.22462 1.25099 2.26682 1.15C2.31091 1.05025 2.33368 0.942392 2.33368 0.833333C2.33368 0.724274 2.31091 0.616417 2.26682 0.516667C2.22462 0.415679 2.16543 0.322667 2.09182 0.241667ZM16.5002 8.33333H4.83349C4.61247 8.33333 4.40051 8.42113 4.24423 8.57741C4.08795 8.73369 4.00015 8.94565 4.00015 9.16667C4.00015 9.38768 4.08795 9.59964 4.24423 9.75592C4.40051 9.9122 4.61247 10 4.83349 10H16.5002C16.7212 10 16.9331 9.9122 17.0894 9.75592C17.2457 9.59964 17.3335 9.38768 17.3335 9.16667C17.3335 8.94565 17.2457 8.73369 17.0894 8.57741C16.9331 8.42113 16.7212 8.33333 16.5002 8.33333Z" fill="currentColor"></path>
    </svg>
  )
}

function IconGear({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <svg className=" w-5 h-5" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16.7666 6.9583L15.1916 6.4333L15.9332 4.94996C16.0084 4.7947 16.0336 4.61993 16.0052 4.44977C15.9768 4.27961 15.8964 4.12245 15.7749 3.99996L13.9999 2.22496C13.8768 2.1017 13.7181 2.02013 13.5462 1.99173C13.3743 1.96333 13.1978 1.98953 13.0416 2.06663L11.5582 2.8083L11.0332 1.2333C10.9778 1.06912 10.8725 0.926317 10.7321 0.824752C10.5917 0.723187 10.4232 0.667916 10.2499 0.666629H7.7499C7.5752 0.666178 7.40477 0.720645 7.26271 0.82233C7.12065 0.924016 7.01414 1.06778 6.95823 1.2333L6.43323 2.8083L4.9499 2.06663C4.79464 1.99145 4.61987 1.9663 4.44971 1.99466C4.27955 2.02302 4.12239 2.10349 3.9999 2.22496L2.2249 3.99996C2.10164 4.1231 2.02007 4.28177 1.99167 4.45368C1.96327 4.62558 1.98946 4.80205 2.06657 4.9583L2.80823 6.44163L1.23323 6.96663C1.06906 7.02208 0.926256 7.12732 0.824691 7.26772C0.723126 7.40812 0.667855 7.57668 0.666568 7.74996V10.25C0.666117 10.4247 0.720584 10.5951 0.822269 10.7372C0.923955 10.8792 1.06772 10.9857 1.23323 11.0416L2.80823 11.5666L2.06657 13.05C1.99138 13.2052 1.96624 13.38 1.9946 13.5502C2.02296 13.7203 2.10343 13.8775 2.2249 14L3.9999 15.775C4.12304 15.8982 4.28171 15.9798 4.45361 16.0082C4.62551 16.0366 4.80199 16.0104 4.95823 15.9333L6.44157 15.1916L6.96657 16.7666C7.02247 16.9321 7.12898 17.0759 7.27104 17.1776C7.41311 17.2793 7.58353 17.3337 7.75823 17.3333H10.2582C10.4329 17.3337 10.6034 17.2793 10.7454 17.1776C10.8875 17.0759 10.994 16.9321 11.0499 16.7666L11.5749 15.1916L13.0582 15.9333C13.2125 16.0066 13.3856 16.0307 13.554 16.0024C13.7224 15.9741 13.8781 15.8947 13.9999 15.775L15.7749 14C15.8982 13.8768 15.9797 13.7182 16.0081 13.5463C16.0365 13.3743 16.0103 13.1979 15.9332 13.0416L15.1916 11.5583L16.7666 11.0333C16.9307 10.9778 17.0735 10.8726 17.1751 10.7322C17.2767 10.5918 17.3319 10.4232 17.3332 10.25V7.74996C17.3337 7.57526 17.2792 7.40483 17.1775 7.26277C17.0758 7.12071 16.9321 7.0142 16.7666 6.9583ZM15.6666 9.64996L14.6666 9.9833C14.4366 10.0579 14.2256 10.1816 14.0483 10.3459C13.8709 10.5102 13.7314 10.711 13.6395 10.9346C13.5475 11.1582 13.5053 11.3991 13.5157 11.6406C13.5261 11.8821 13.589 12.1185 13.6999 12.3333L14.1749 13.2833L13.2582 14.2L12.3332 13.7C12.1195 13.5935 11.8854 13.5342 11.6468 13.526C11.4082 13.5179 11.1706 13.5611 10.9502 13.6528C10.7297 13.7445 10.5315 13.8824 10.369 14.0573C10.2065 14.2322 10.0835 14.44 10.0082 14.6666L9.6749 15.6666H8.3499L8.01657 14.6666C7.94198 14.4367 7.81826 14.2257 7.65398 14.0483C7.48971 13.871 7.28882 13.7315 7.06525 13.6395C6.84168 13.5475 6.60078 13.5053 6.35925 13.5158C6.11773 13.5262 5.88137 13.5891 5.66657 13.7L4.71657 14.175L3.7999 13.2583L4.2999 12.3333C4.41081 12.1185 4.47367 11.8821 4.48411 11.6406C4.49454 11.3991 4.45232 11.1582 4.36035 10.9346C4.26838 10.711 4.12888 10.5102 3.95152 10.3459C3.77416 10.1816 3.56319 10.0579 3.33323 9.9833L2.33323 9.64996V8.34996L3.33323 8.01663C3.56319 7.94204 3.77416 7.81832 3.95152 7.65404C4.12888 7.48977 4.26838 7.28888 4.36035 7.06531C4.45232 6.84174 4.49454 6.60084 4.48411 6.35932C4.47367 6.11779 4.41081 5.88143 4.2999 5.66663L3.8249 4.74163L4.74157 3.82496L5.66657 4.29996C5.88137 4.41087 6.11773 4.47373 6.35925 4.48417C6.60078 4.49461 6.84168 4.45238 7.06525 4.36041C7.28882 4.26845 7.48971 4.12894 7.65398 3.95158C7.81826 3.77422 7.94198 3.56325 8.01657 3.3333L8.3499 2.3333H9.6499L9.98323 3.3333C10.0578 3.56325 10.1815 3.77422 10.3458 3.95158C10.5101 4.12894 10.711 4.26845 10.9346 4.36041C11.1581 4.45238 11.399 4.49461 11.6405 4.48417C11.8821 4.47373 12.1184 4.41087 12.3332 4.29996L13.2832 3.82496L14.1999 4.74163L13.6999 5.66663C13.5934 5.88033 13.5341 6.11442 13.526 6.35304C13.5178 6.59165 13.5611 6.82924 13.6527 7.0497C13.7444 7.27016 13.8823 7.46835 14.0573 7.63086C14.2322 7.79337 14.44 7.9164 14.6666 7.99163L15.6666 8.32496V9.64996ZM8.9999 5.66663C8.34063 5.66663 7.69616 5.86213 7.148 6.2284C6.59984 6.59467 6.17259 7.11526 5.9203 7.72435C5.66801 8.33344 5.602 9.00366 5.73062 9.65026C5.85923 10.2969 6.1767 10.8908 6.64288 11.357C7.10905 11.8232 7.703 12.1406 8.3496 12.2692C8.9962 12.3979 9.66643 12.3319 10.2755 12.0796C10.8846 11.8273 11.4052 11.4 11.7715 10.8519C12.1377 10.3037 12.3332 9.65923 12.3332 8.99996C12.3332 8.11591 11.982 7.26806 11.3569 6.64294C10.7318 6.01782 9.88396 5.66663 8.9999 5.66663ZM8.9999 10.6666C8.67027 10.6666 8.34803 10.5689 8.07395 10.3857C7.79987 10.2026 7.58625 9.94231 7.4601 9.63777C7.33396 9.33322 7.30095 8.99811 7.36526 8.67481C7.42957 8.35151 7.5883 8.05454 7.82139 7.82145C8.05448 7.58836 8.35145 7.42963 8.67475 7.36532C8.99805 7.30101 9.33316 7.33402 9.63771 7.46016C9.94225 7.58631 10.2025 7.79993 10.3857 8.07401C10.5688 8.34809 10.6666 8.67033 10.6666 8.99996C10.6666 9.44199 10.491 9.86591 10.1784 10.1785C9.86585 10.491 9.44193 10.6666 8.9999 10.6666Z" fill="currentColor"></path>
    </svg>
  )
}

function IconSignOut({className, ...props}: React.ComponentProps<'svg'>) {
  return (
    <svg className=" w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3.33368 9.99996C3.33368 10.221 3.42148 10.4329 3.57776 10.5892C3.73404 10.7455 3.946 10.8333 4.16701 10.8333H10.492L8.57535 12.7416C8.49724 12.8191 8.43524 12.9113 8.39294 13.0128C8.35063 13.1144 8.32885 13.2233 8.32885 13.3333C8.32885 13.4433 8.35063 13.5522 8.39294 13.6538C8.43524 13.7553 8.49724 13.8475 8.57535 13.925C8.65281 14.0031 8.74498 14.0651 8.84653 14.1074C8.94808 14.1497 9.057 14.1715 9.16701 14.1715C9.27702 14.1715 9.38594 14.1497 9.48749 14.1074C9.58904 14.0651 9.68121 14.0031 9.75868 13.925L13.092 10.5916C13.1679 10.5124 13.2273 10.4189 13.267 10.3166C13.3504 10.1137 13.3504 9.88618 13.267 9.68329C13.2273 9.581 13.1679 9.48755 13.092 9.40829L9.75868 6.07496C9.68098 5.99726 9.58874 5.93563 9.48722 5.89358C9.3857 5.85153 9.27689 5.82988 9.16701 5.82988C9.05713 5.82988 8.94832 5.85153 8.8468 5.89358C8.74529 5.93563 8.65304 5.99726 8.57535 6.07496C8.49765 6.15266 8.43601 6.2449 8.39396 6.34642C8.35191 6.44794 8.33027 6.55674 8.33027 6.66663C8.33027 6.77651 8.35191 6.88532 8.39396 6.98683C8.43601 7.08835 8.49765 7.18059 8.57535 7.25829L10.492 9.16663H4.16701C3.946 9.16663 3.73404 9.25442 3.57776 9.4107C3.42148 9.56698 3.33368 9.77895 3.33368 9.99996ZM14.167 1.66663H5.83368C5.17064 1.66663 4.53475 1.93002 4.06591 2.39886C3.59707 2.8677 3.33368 3.50358 3.33368 4.16663V6.66663C3.33368 6.88764 3.42148 7.0996 3.57776 7.25588C3.73404 7.41216 3.946 7.49996 4.16701 7.49996C4.38803 7.49996 4.59999 7.41216 4.75627 7.25588C4.91255 7.0996 5.00035 6.88764 5.00035 6.66663V4.16663C5.00035 3.94561 5.08814 3.73365 5.24442 3.57737C5.4007 3.42109 5.61267 3.33329 5.83368 3.33329H14.167C14.388 3.33329 14.6 3.42109 14.7563 3.57737C14.9125 3.73365 15.0003 3.94561 15.0003 4.16663V15.8333C15.0003 16.0543 14.9125 16.2663 14.7563 16.4225C14.6 16.5788 14.388 16.6666 14.167 16.6666H5.83368C5.61267 16.6666 5.4007 16.5788 5.24442 16.4225C5.08814 16.2663 5.00035 16.0543 5.00035 15.8333V13.3333C5.00035 13.1123 4.91255 12.9003 4.75627 12.744C4.59999 12.5878 4.38803 12.5 4.16701 12.5C3.946 12.5 3.73404 12.5878 3.57776 12.744C3.42148 12.9003 3.33368 13.1123 3.33368 13.3333V15.8333C3.33368 16.4963 3.59707 17.1322 4.06591 17.6011C4.53475 18.0699 5.17064 18.3333 5.83368 18.3333H14.167C14.8301 18.3333 15.4659 18.0699 15.9348 17.6011C16.4036 17.1322 16.667 16.4963 16.667 15.8333V4.16663C16.667 3.50358 16.4036 2.8677 15.9348 2.39886C15.4659 1.93002 14.8301 1.66663 14.167 1.66663Z" fill="currentColor"></path>
    </svg>
  )
}

function IconX({className, ...props}: React.ComponentProps<'svg'>) {
  return (
    <svg {...props} className="w-3.5 h-3.5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" />
    </svg>
  )
}


export {
  IconEdit,
  IconNextChat,
  IconOpenAI,
  IconVercel,
  IconGitHub,
  IconSeparator,
  IconArrowDown,
  IconArrowRight,
  IconUser,
  IconPlus,
  IconArrowElbow,
  IconSpinner,
  IconMessage,
  IconTrash,
  IconRefresh,
  IconStop,
  IconSidebar,
  IconMoon,
  IconSun,
  IconCopy,
  IconCheck,
  IconDownload,
  IconClose,
  IconShare,
  IconUsers,
  IconExternalLink,
  IconChevronUpDown,
  IconQuestionCircle,
  IconOpenFile,
  IconList,
  IconGear,
  IconSignOut,
  IconX
}
