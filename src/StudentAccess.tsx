import ImageCard from './components/ImageCard';
import { accessCamera } from './functions';
import { useState } from 'react';
import Header from './components/Header';
import Button from './components/Button';
import Video from './components/Video';
import Login from './pages/Login';
import Table from './components/Table';

function StudentAccess() {
    const [login, setLogin] = useState(false);
    const [borrowTable, setBorrowTable] = useState(false);
    const [cameraActive, setCameraActive] = useState(false);

    const handleBorrow = async () => {
      const code = await accessCamera();
      if (code == null) {
        window.alert('Failed to access camera. Please check permissions and try again.');
      }
    };

    const handleReturn = async () => {
      const code = await accessCamera();
      if (code == null) {
        window.alert('Failed to access camera. Please check permissions and try again.');
      }
    };

    const handleLogin = () => {
      // Placeholder for actual login logic
      setLogin(true);
      setCameraActive(true);
    };

    return ( <>
      <div className="bg-gradient-to-br via-slate-800 to-emerald-900">
        <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2">
          <div className="space-y-6 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                Bibliotech Library
            </p>
            {!login ? <>
            <Header headerText="Student Access" paragraphText="Please enter your student ID and password to access the library system." />
            <Login  usernameLabel="Student ID" usernamePlaceholder="Enter student ID" passwordLabel="Password" passwordPlaceholder="Enter student password" onClick={() => {handleLogin()}} /> 
            </> : 
            borrowTable ? 
            <><Header headerText="My Books" paragraphText="List of all books borrowed by you." />
            <Table tableContent={[]} />
            <Button text="Back" onClick={() => setBorrowTable(false)} /></>
            : <>
              <Header headerText="Student Access" paragraphText="Select the option you want to do." />
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button text="Borrow" onClick={() => {handleBorrow()}} />
              <Button text="Return book" onClick={() => {handleReturn()}} />
              <Button text="View my books" onClick={() => setBorrowTable(true)} />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {cameraActive && <Video />}
            </div>
            </>}
          </div>
          <div className="flex justify-end">
            <ImageCard image="/src/assets/logo.png" />
          </div>
        </div>
      </div>
    </>)
}

export default StudentAccess;
