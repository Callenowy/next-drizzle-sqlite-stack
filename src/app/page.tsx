import { Heading } from '@/components/heading';

export default function Home() {
  return (
    <main>
      <div className="mx-auto w-full max-w-2xl px-6 pt-[70px]">
        <div className="space-y-4 pb-8 text-center md:pb-10">
          <Heading
            level="1"
            className="text-center text-lg tracking-tight md:text-2xl md:tracking-tightest"
          >
            Nothing here yet
          </Heading>
        </div>
      </div>
    </main>
  );
}
