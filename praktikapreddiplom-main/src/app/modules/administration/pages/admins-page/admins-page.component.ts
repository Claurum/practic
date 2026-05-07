import { Component, OnInit } from "@angular/core";
import {
  AdminService,
  AdminRole,
} from "src/app/domains/services/admin.service";
import { Admin } from "src/app/domains/modules/admin.model";

@Component({
  selector: "app-admins-page",
  templateUrl: "./admins-page.component.html",
  styleUrls: ["./admins-page.component.css"],
})
export class AdminsPageComponent implements OnInit {
  admins: Admin[] = [];
  loading = false;
  error: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.loading = true;
    this.error = null;
    this.adminService.getAdmins(false, 100, 0).subscribe({
      next: (res) => {
        if (res && (res as any).admins) {
          this.admins = res.admins;
        } else if (Array.isArray(res as any)) {
          // In case backend returns raw array
          this.admins = res as unknown as Admin[];
        } else {
          this.admins = [];
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || "Не удалось загрузить админов";
        this.loading = false;
      },
    });
  }

  refresh(): void {
    this.loadAdmins();
  }
}
