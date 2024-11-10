import Image from 'next/image'

export function Logo() {
  return (
    <div>
      <Image
        src="/logo-facilite.svg"
        width={240}
        height={200}
        alt="Facilite Super Cars"
      />

      <h1 className="text-gray-100 text-3xl mt-6">
        <span className="inline-flex items-center">
          Digija o{' '}
          <Image
            src="/arrow-left.svg"
            alt="arrow-left"
            className="ml-2 w-auto h-6 inline mt-1"
            width={0}
            height={0}
          />
        </span>
        <br />
        extraordinário
      </h1>
    </div>
  )
}
