export interface LoginForm {
    username: string;
    password: string;

}

export interface Employee {
    employee_id: number | null;
    name: string | null;
    phone_number: string | null;
    supervisors: string | null;
}


export interface JwtWUser {
    jwtToken: string;
    employee: Employee;

}
export interface SearchObject {
    searchQuery: string;
    searchOption: 'name' | 'employee_id'
}
