'use client'

import { Avatar, Dropdown } from 'antd'
import classnames from "classnames"
import { useSession } from 'next-auth/react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiFillBug } from 'react-icons/ai'

const NavBar = () => {


    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center justify-between">

            <div className="flex items-center gap-3">
                <Link href='/'>
                    <AiFillBug />
                </Link>
                <NavLink />
            </div>
            <AuthStatus />
        </nav>
    )
}

const NavLink = () => {
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ]

    return <ul className="flex space-x-6">
        {links.map((link) => (
            <li key={link.href}>
                <Link
                    //className={`${link.href === currentPath ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-800 transition-colors'}`}
                    className={classnames({
                        'nav-link': true,
                        '!text-zinc-900': link.href === currentPath,
                    })}
                    href={link.href}>
                    {link.label}
                </Link>
            </li>
        ))}
    </ul>
}

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === 'loading') return null

    if (status === 'unauthenticated')
        return <Link className='nav-link' href='api/auth/signin'>Login</Link>

    return <div>
        {status === 'authenticated' &&
            <Dropdown menu={{
                items: [{
                    label: session.user?.email,
                    key: '0',
                }, {
                    label: (<Link href='api/auth/signout'>Logout</Link>),
                    key: '1',
                }]
            }}>
                <Avatar
                    className='cursor-pointer'
                    src={session?.user!.image}
                    alt='?' />
            </Dropdown>
        }
    </div>
}

export default NavBar