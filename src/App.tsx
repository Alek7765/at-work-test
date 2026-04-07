import { BrowserRouter, Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage/HomePage';
import { EditPage } from './pages/EditPage/EditPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
