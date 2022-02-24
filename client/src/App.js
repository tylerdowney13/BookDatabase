import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import SearchBooks from './pages/SearchBooks';
import UpdateBook from './pages/UpdateBook';
import DeleteBook from './pages/DeleteBook';
import CreateBook from './pages/CreateBook';

import Books from './pages/Books';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact={true} element={<Books />} />
        <Route path="/search" element={<SearchBooks />} />
        <Route path="/update" element={<UpdateBook />} />
        <Route path="/delete" element={<DeleteBook />} />
        <Route path="/create" element={<CreateBook />} />
      </Routes>
    </Layout>
    
  );
}

export default App;
