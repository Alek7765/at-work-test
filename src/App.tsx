import { BrowserRouter, Routes, Route } from 'react-router'
import Content from '@/layouts/Content/Content'
import HomePage from '@/pages/HomePage/HomePage'
import EditPage from '@/pages/EditPage/EditPage'

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Content />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}