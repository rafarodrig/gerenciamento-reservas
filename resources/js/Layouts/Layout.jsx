import NavBar from '@/components/NavBar'
import { Link } from '@inertiajs/react'

export default function Layout({ children }) {
  return (
    <main>
      <header>
        <NavBar></NavBar>
      </header>
      {children}
    </main>
  )
}