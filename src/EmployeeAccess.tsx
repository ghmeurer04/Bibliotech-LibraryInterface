import ImageCard from './components/ImageCard';
import { useState } from 'react';
import Button from './components/Button';
import { accessCamera } from './functions';
import Header from './components/Header';
import Login from './pages/Login';
import RegisterStudent from './pages/RegisterStudent';
import RegisterBook from './pages/RegisterBook';
import RemoveStudent from './pages/RemoveStudent';
import RemoveBook from './pages/RemoveBook';
import Table from './components/Table';
import { getTableData, loginCheck, saveStudent, saveBook, deleteStudent, deleteBook } from './database';


const PAGE_SIZE = 5;
type TableType = 'students' | 'books' | 'borrowings';
var fetchData: Record<TableType, any[]> = {'students': [], 'books': [], 'borrowings': []};


function EmployeeAccess() {
    const [login, setLogin] = useState(false);
    const [registerStudent, setRegisterStudent] = useState(false);
    const [registerBook, setRegisterBook] = useState(false);
    const [tableStudent, setTableStudent] = useState(false);
    const [tableBook, setTableBook] = useState(false);
    const [tableBorrowing, setTableBorrowing] = useState(false);
    const [tableData, setTableData] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(false);
    const [removeStudent, setRemoveStudent] = useState(false);
    const [removeBook, setRemoveBook] = useState(false);

    const formatTableData = (table: TableType, data: any[]) => {
      if (table === 'students') {
        return data.map(student => ({ RA: student.ra, name: student.name, email: student.email, course: student.course }));
      }

      if (table === 'books') {
        return data.map(book => ({ ID: book.id, title: book.title, author: book.author, isbn: book.isbn, category: book.category, availability: book.availability }));
      }

      return data;
    };

    const loadTablePage = async (table: TableType, targetPage: number) => {

      if(fetchData[table] && fetchData[table].length >= (targetPage + 1) * PAGE_SIZE) {
        setTableData(formatTableData(table, fetchData[table].slice(targetPage * PAGE_SIZE, (targetPage + 1) * PAGE_SIZE)));
        setHasNext(fetchData[table].length > PAGE_SIZE * targetPage + 1);
        setPage(targetPage);
        return;
      }

      const data = await getTableData(table, targetPage * PAGE_SIZE, PAGE_SIZE + 1);
      fetchData[table] = fetchData[table].concat(data);
      setTableData(formatTableData(table, data.slice(0, PAGE_SIZE)));
      setHasNext(data.length > PAGE_SIZE);
      setPage(targetPage);
    };

    const handleLogin = async () => {
      const loginValue = (document.getElementById(`employee-id`) as HTMLInputElement | null)?.value ?? '';
      const passwordValue = (document.getElementById(`employee-password`) as HTMLInputElement | null)?.value ?? '';
      setLogin(await loginCheck('employee', loginValue, passwordValue));
    };

    const handleRegisterStudent = async () => {
      const nameValue = (document.getElementById(`student-name`) as HTMLInputElement | null)?.value ?? '';
      const raValue = (document.getElementById(`student-ra`) as HTMLInputElement | null)?.value ?? '';
      const emailValue = (document.getElementById(`student-email`) as HTMLInputElement | null)?.value ?? '';
      const courseValue = (document.getElementById(`student-course`) as HTMLInputElement | null)?.value ?? '';
      const passwordValue = (document.getElementById(`student-password`) as HTMLInputElement | null)?.value ?? '';
      const success = !await saveStudent(nameValue, raValue, emailValue, courseValue, passwordValue);
      setRegisterStudent(success);
    };

    const handleBookBarcode = async () => {
      const code = await accessCamera();
      if (!code) {
        window.alert('Failed to access camera. Please check permissions and try again.');
      }
    }

    const handleRegisterBook = async () => {
      const bookTitle = (document.getElementById(`book-title`) as HTMLInputElement | null)?.value ?? '';
      const authorValue = (document.getElementById(`book-author`) as HTMLInputElement | null)?.value ?? '';
      const isbnValue = (document.getElementById(`book-isbn`) as HTMLInputElement | null)?.value ?? '';
      const categoryValue = (document.getElementById(`book-category`) as HTMLInputElement | null)?.value ?? '';
      console.log("Book info:", { bookTitle, authorValue, isbnValue, categoryValue });
      const success = ! await saveBook(bookTitle, authorValue, isbnValue, categoryValue,true);
      setRegisterBook(success);
    };

    const handleRemoveStudent = async () => {
      const studentRa = (document.getElementById(`student-ra`) as HTMLInputElement | null)?.value ?? '';
      const confirmStudentRa = (document.getElementById(`confirm-student-ra`) as HTMLInputElement | null)?.value ?? '';
      if (studentRa !== confirmStudentRa) {
        window.alert('Student RA and confirmation do not match.');
        return;
      }
      await deleteStudent(studentRa);
      setRemoveStudent(false);
    }

    const handleRemoveBook = async () => {
      const bookId = (document.getElementById(`book-id`) as HTMLInputElement | null)?.value ?? '';
      const confirmBookId = (document.getElementById(`confirm-book-id`) as HTMLInputElement | null)?.value ?? '';
      if (bookId !== confirmBookId) {
        window.alert('Book ID and confirmation do not match.');
        return;
      }
      await deleteBook(bookId);
      setRemoveBook(false);
    }

    const handleTableStudent = async () => {
      fetchData = {'students': [], 'books': [], 'borrowings': []};
      await loadTablePage('students', 0);
      setTableStudent(true);
    }

    const handleTableBook = async () => {
      fetchData = {'students': [], 'books': [], 'borrowings': []};
      await loadTablePage('books', 0);
      setTableBook(true);
    }

    const handleTableBorrowing = async () => {
      fetchData = {'students': [], 'books': [], 'borrowings': []};
      await loadTablePage('borrowings', 0);
      setTableBorrowing(true);
    }

    const handlePagination = async (table: TableType, next: boolean) => {
      const nextPage = next ? page + 1 : page - 1;
      if (nextPage < 0) {
        return;
      }
      await loadTablePage(table, nextPage);
    }


    return (<>
      <div className="bg-gradient-to-br via-slate-800 to-emerald-900">
        <div className="mx-auto grid min-h-screen w-full max-w-full grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-2 md:px-10 lg:px-16">
          <div className="space-y-6 text-center md:text-left ">
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                Bibliotech Library
            </p>
            {!login ? 
            <> <Header headerText="Employee Access" paragraphText="Please enter your employee ID and password to access the library system." />
            <Login usernameLabel="Employee ID" usernamePlaceholder="Enter employee ID" passwordLabel="Employee Password" passwordPlaceholder="Enter employee password" onClick={() => {handleLogin()}} />
            </> 
            : registerStudent ? 
            <RegisterStudent backClick={() => setRegisterStudent(false)} registerClick={() => handleRegisterStudent()} />
            : registerBook ?
            <RegisterBook scanBookBarcode={() => handleBookBarcode()} backClick={() => setRegisterBook(false)} registerClick={() => handleRegisterBook()} />
            : removeStudent?
            <RemoveStudent backClick={() => setRemoveStudent(false)} registerClick={() => handleRemoveStudent()} />
            : removeBook?
            <RemoveBook backClick={() => setRemoveBook(false)} registerClick={() => handleRemoveBook()} />
            : tableStudent ?
            <><Header headerText="Students" paragraphText="List of all students registered in the system." />
            <Table
              tableContent={tableData}
              page={page}
              canPrevious={page > 0}
              canNext={hasNext}
              onPrevious={() => handlePagination('students', false)}
              onNext={() => handlePagination('students', true)}
            />
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button text="Back" onClick={() => setTableStudent(false)} />
            </div></>
            : tableBook ?
            <><Header headerText="Books" paragraphText="List of all books registered in the system." />
            <Table
              tableContent={tableData}
              page={page}
              canPrevious={page > 0}
              canNext={hasNext}
              onPrevious={() => handlePagination('books', false)}
              onNext={() => handlePagination('books', true)}
            />
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button text="Back" onClick={() => setTableBook(false)} />
            </div></>
            : tableBorrowing ?
            <><Header headerText="Borrowings" paragraphText="List of all borrowings registered in the system." />
            <Table
              tableContent={tableData}
              page={page}
              canPrevious={page > 0}
              canNext={hasNext}
              onPrevious={() => handlePagination('borrowings', false)}
              onNext={() => handlePagination('borrowings', true)}
            />
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button text="Back" onClick={() => setTableBorrowing(false)} />
            </div></>
            :
            <><Header headerText="Employee Access" paragraphText="Select the option you want to do." />
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button text="View students" onClick={() => handleTableStudent()} />
              <Button text="View books" onClick={() => handleTableBook()} />
              <Button text="View borrowings" onClick={() => handleTableBorrowing()} />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button text="Register new student" onClick={() => setRegisterStudent(true)} />
              {/* <Button text="Update student information" onClick={() => setRegisterStudent(true)} /> */}
              <Button text="Remove student" onClick={() => setRemoveStudent(true)} />
            </div>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button text="Register new book" onClick={() => setRegisterBook(true)} />
              {/* <Button text="Update book information" onClick={() => setRegisterBook(true)} /> */}
              <Button text="Remove book" onClick={() => setRemoveBook(true)} />
            </div></>}
          </div>
          <div className="flex items-center justify-center">
            <ImageCard image="/src/assets/logo.png" />
          </div>
        </div>
      </div>
    </>)
}

export default EmployeeAccess;
