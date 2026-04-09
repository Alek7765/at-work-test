import { Header } from '@/layouts/Header/Header'
import { Outlet } from 'react-router'

export default () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}