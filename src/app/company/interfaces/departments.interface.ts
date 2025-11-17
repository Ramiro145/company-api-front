export interface Department {
  id:          number;
  name:        string;
  location:    string;
  lastUpdated: Date | null;
}



export interface DepartmentDTO {
  id?: number;
  name: string;
  location:string;

}
