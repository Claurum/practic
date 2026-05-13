import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../../domains/modules/admin.model';
import { AdminService } from '../../../../domains/services/admin.service';

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.css']
})
export class AdminsPageComponent implements OnInit {
  // 0 - скрыть | 1 - добавить админа
  asideIndex: number = 1;
  admins: Admin[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe({
      next: (res) => {
        this.admins = res.admins;
      }
    });
  }

  get tableData() {
    return this.admins.map(admin => ({
      admin_id: admin.admin_id,
      admin_login: admin.admin_login,
      is_active_admin: admin.is_active_admin,
      admin_birth_date: admin.admin_birth_date,
      created_at: admin.created_at
    }));
  }

  onAddAdminBtn() {
    this.asideIndex = 1;
  }

  onAdminAdded() {
    this.loadAdmins();
  }
}
