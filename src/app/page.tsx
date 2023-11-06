import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <h3>Please sign in below</h3>
        </div>
        <div>
          <h3>Logs for today</h3>
        </div>
      </div>

      <Link href="/users">Users</Link>
    </main>
  );
}
