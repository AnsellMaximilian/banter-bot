import Image from "next/image";
import icon from "@/assets/icon.svg";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex-col flex">
      <header className="border-b border-border">
        <nav className="flex gap-4 container mx-auto p-4">
          <div className="flex items-center gap-4">
            <Image src={icon} width={50} height={50} alt="logo" />
            <div className="text-2xl font-bold">Banter Bot</div>
          </div>
          <ul></ul>
          <div className="ml-auto">
            <Button>Register</Button>
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4">test</main>
    </div>
  );
}
