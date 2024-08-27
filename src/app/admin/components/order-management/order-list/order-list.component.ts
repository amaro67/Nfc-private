// order-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminOrderService } from '../../../services/admin-order.service';
import { Order } from '../../../../models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];

  constructor(private adminOrderService: AdminOrderService) {}

  ngOnInit(): void {
    this.adminOrderService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }
}
