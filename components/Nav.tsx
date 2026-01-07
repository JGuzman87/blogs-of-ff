import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <>
      <div
        className="navbar 
       shadow-xl"
      >
        <div className="flex-1">
          <Link href={'/'} className=""><Image className="" src="/logo.png" alt="ff-logo"height={200} width={200}/></Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary className="text-xl text-white font-bold">
                  Login
                </summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <Link href={"/login"}>Login</Link>
                  </li>
                  <li>
                    <Link href={"/signup"}>Signup</Link>
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