'use client'

import classnames from "classnames"
import { useSession } from 'next-auth/react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiFillBug } from 'react-icons/ai'

const NavBar = () => {
    const currentPath = usePathname();
    const { status, data } = useSession();
    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
            <Link href='/'><AiFillBug /></Link>
            <ul className="flex space-x-6">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            //className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-800 transition-colors'}`}
                            className={classnames({
                                'text-zinc-900': link.href === currentPath,
                                'text-zinc-500': link.href !== currentPath,
                                'hover:text-zinc-800 transition-colors': true
                            })}
                            href={link.href}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
            <div>
                {status === 'authenticated' && <Link href='api/auth/signout'>Logout</Link>}
                {status === 'unauthenticated' && <Link href='api/auth/signin'>Login</Link>}
            </div>
        </nav>
    )
}

export default NavBar