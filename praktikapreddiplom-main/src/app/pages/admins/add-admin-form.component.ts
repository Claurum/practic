import { Component, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../domains/services/admin.service';

@Component({
    selector: 'app-add-admin-form',
    template: `
    <div class="form-container">
        <h3>Добавить администратора</h3>
        <form (ngSubmit)="onSubmit()">
        <input [(ngModel)]="admin.admin_login" placeholder="Логин" required>
        <input [(ngModel)]="admin.admin_password" placeholder="Пароль" type="password" required>
        <label>
            <input type="checkbox" [(ngModel)]="admin.is_active_admin"> Активен
        </label>
        <input [(ngModel)]="admin.admin_birth_date" placeholder="Дата рождения (ГГГГ-ММ-ДД)">
        <button type="submit">Добавить</button>
        <button type="button" (click)="onClose()">Отмена</button>
        </form>
    </div>
    `,
    styles: [`
    .form-container { padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
    form { display: flex; flex-direction: column; gap: 10px; }
    button { margin-right: 10px; }
    `]
})
export class AddAdminFormComponent {
    admin = {
    admin_login: '',
    admin_password: '',
    is_active_admin: true,
    admin_birth_date: ''
    };

    @Output() adminCreated = new EventEmitter<any>();
    @Output() close = new EventEmitter<void>();

    constructor(private adminService: AdminService) {}

    onSubmit(): void {
    this.adminService.createAdmin(this.admin).subscribe({
        next: (response) => {
        const newAdmin = response.admin || response;
        this.adminCreated.emit(newAdmin);
        },
        error: (err) => console.error('Ошибка при создании:', err)
    });
    }

    onClose(): void {
    this.close.emit();
    }
}