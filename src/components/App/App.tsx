import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from 'src/components/HomePage';
import { TemplatePage } from 'src/components/TemplatePage';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<TemplatePage />} path="/:id" />
      </Routes>
    </BrowserRouter>
  );
}
