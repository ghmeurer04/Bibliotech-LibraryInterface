const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '/api').replace(/\/$/, '');

export async function loginCheck(table:string, loginValue?: string, passwordValue?: string): Promise<boolean> {

    if (!loginValue || !passwordValue) {
        window.alert('Please enter both Login ID and password.');
        return false;
    }
    try {
        const response = await fetch(`${apiBaseUrl}/${table}/${encodeURIComponent(loginValue)}`);
        if (!response.ok) {
            throw new Error(`Login failed: Check Login and Password`);
        }
        const employee = await response.json();
        console.log('Employee from API:', employee);
        if (!employee || String(employee.password) !== String(passwordValue)) {
            throw new Error('Login failed: Check Login and Password');
        }
        return true;

        } catch (error) {
            console.error('Login fetch error:', error);
            if (error instanceof TypeError) {
                window.alert('Could not reach the API. Confirm FastAPI is running on http://127.0.0.1:8000.');
            } else {
                window.alert(error instanceof Error ? error.message : 'An unknown error occurred during login. Please try again.');
            }
            return false;
        }
}

export async function getTableData(table: string, offset: number, limit: number): Promise<any[]> {
    try {
        const response = await fetch(`${apiBaseUrl}/${table}?skip=${offset}&limit=${limit}`);
        console.log("response",response)
        if (!response.ok) {
            throw new Error(`Failed to fetch ${table} data`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${table} data:`, error);
        if (error instanceof TypeError) {
            window.alert('Could not reach the API. Confirm FastAPI is running on http://127.0.0.1:8000.');
            } else {
                window.alert(error instanceof Error ? error.message : 'An unknown error occurred during login. Please try again.');
            }
        }
        return [];
}

export async function saveStudent(name:string, ra:string, email:string, course:string, password:string) : Promise<boolean> {
    if (!name || !ra || !email || !course || !password) {
        window.alert('Please fill in all fields.');
        return false;
    }
    try {
        const response = await fetch(`${apiBaseUrl}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, ra, email, course, password })
        });
        if (!response.ok) {
            throw new Error('Failed to save student data');
        }
        const result = await response.json();
        console.log('Student saved:', result);
        return true;
    } catch (error) {
        console.error('Error saving student data:', error);
        window.alert(error instanceof Error ? error.message : 'An unknown error occurred while saving student data.');
        return false;
    }
}

export async function saveBook(title:string, author:string, isbn:string, category:string, availability:boolean) : Promise<boolean> {
    if (!title || !author || !isbn || !category || availability === undefined) {
        window.alert('Please fill in all fields.');
        return false;
    }
    try {
        const response = await fetch(`${apiBaseUrl}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, isbn, category, availability })
        });
        if (!response.ok) {
            throw new Error('Failed to save book data');
        }
        const result = await response.json();
        console.log('Book saved:', result);
        return true;
    } catch (error) {
        console.error('Error saving book data:', error);
        window.alert(error instanceof Error ? error.message : 'An unknown error occurred while saving book data.');
        return false;
    }
}

export async function deleteStudent(ra: string): Promise<boolean> {
    if (!ra) {
        window.alert('Please enter the student ID.');
        return false;
    }
    try {
        const response = await fetch(`${apiBaseUrl}/students/${encodeURIComponent(ra)}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete student');
        }
        return true;
    } catch (error) {
        console.error('Error deleting student:', error);
        window.alert(error instanceof Error ? error.message : 'An unknown error occurred while deleting student data.');
        return false;
    }
}

export async function deleteBook(id: string): Promise<boolean> {
    if (!id) {
        window.alert('Please enter the book ID.');
        return false;
    }
    try {
        const response = await fetch(`${apiBaseUrl}/books/${encodeURIComponent(id)}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete book');
        }
        return true;
    } catch (error) {
        console.error('Error deleting book:', error);
        window.alert(error instanceof Error ? error.message : 'An unknown error occurred while deleting book data.');
        return false;
    }
}