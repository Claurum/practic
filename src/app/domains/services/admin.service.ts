import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../modules/admin.model';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    private apiUrl = '/api/admins';

    constructor(private http: HttpClient) { }

    getAdmins(includeInactive: boolean = false, limit: number = 50, offset: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}?include_inactive=${includeInactive}&limit=${limit}&offset=${offset}`);
    }

    getAdminById(adminId: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/${adminId}`);
    }

    createAdmin(adminData: Partial<Admin>): Observable<any> {
    return this.http.post(this.apiUrl, adminData);
    }

    updateAdmin(adminId: number, changes: Partial<Admin>): Observable<Admin> {
    return this.http.patch<Admin>(`${this.apiUrl}/${adminId}`, changes);
    }

  // 5. Удалить админа (DELETE)
    deleteAdmin(adminId: number, hard: boolean = false): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${adminId}?hard=${hard}`);
    }
}