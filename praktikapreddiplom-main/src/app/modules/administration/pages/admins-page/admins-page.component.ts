import { Component } from '@angular/core';
import { UserRegister } from '../../../../domains/modules/user.model';
import { UserService } from '../../../../domains/services/user.service';

@Component({
  selector: 'app-admins-page',
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.css']
})
export class AdminsPageComponent {
  admins: UserRegister[] = [];

  constructor(private userService: UserService) {
    this.filterAdmins();
  }

  filterAdmins() {
    this.admins = this.userService.users.filter(user => {
      const userRoles = this.userService.roles[user.userId];
      return userRoles && userRoles.includes('admin');
    });
  }

  onAddAdminBtn() {
    // Логика добавления админа
  }
}
