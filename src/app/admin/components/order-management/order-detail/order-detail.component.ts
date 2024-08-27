// order-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminOrderService } from '../../../services/admin-order.service';
import { Order } from '../../../../models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;

  constructor(private adminOrderService: AdminOrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const orderId = Number(this.route.snapshot.paramMap.get('id'));
    this.adminOrderService.getOrderById(orderId).subscribe(order => {
      this.order = order;
    });
  }
}
