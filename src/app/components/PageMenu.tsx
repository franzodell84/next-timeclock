import Link from "next/link";

export const PageMenu = () => {
  return (
    <div className="flex flex-row flex-nowrap p-2">
      <div>
        <Link className="link" href="/">
          Logs
        </Link>
      </div>
      <div className="divider divider-horizontal"></div>
      <div>
        <Link className="link" href="/users">
          Users
        </Link>
      </div>
    </div>
  );
};
