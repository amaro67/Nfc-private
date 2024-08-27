// // user-detail.component.ts
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { AdminUserService } from '../../../services/admin-user.service';
// import { User } from '../../../../models/user.model';

// @Component({
//   selector: 'app-user-detail',
//   templateUrl: './user-detail.component.html',
//   styleUrls: ['./user-detail.component.css']
// })
// export class UserDetailComponent implements OnInit {
//   user: User | null = null;

//   constructor(private adminUserService: AdminUserService, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     const userId = Number(this.route.snapshot.paramMap.get('id'));
//     this.adminUserService.getUserById(userId).subscribe(user => {
//       this.user = user;
//     });
//   }
// }
