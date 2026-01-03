import Link from "next/link";

const Nav = () => {
  return (
    <>
      <div className="navbar 
       shadow-xl">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">FF-Blogs</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary className="text-xl text-white font-bold">Login</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link href={"/login"}>Login</Link>
                  </li>
                  <li>
                    <a>Signup</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav;