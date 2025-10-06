import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import StudentTable from './studentTable';
import CreateStudent from './CreateStudent';
import EditStudent from './EditStudent';
import ViewDetails from './ViewStudent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentTable />} />
        <Route path="/student/create" element={<CreateStudent editStatus={false} />} />
<Route path="/student/edit/:studentid" element={<CreateStudent editStatus={true} />} />

          <Route path="/student/view/:studentid" element={<ViewDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
