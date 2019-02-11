import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialogRef } from '@angular/material';
import { Ticket } from 'src/app/interfaces/ticket';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  constructor(private db: AngularFirestore, private dialogRef: MatDialogRef<TicketsComponent>) {
    this.ticketsRef = db.collection<Ticket>('tickets', ref => {
      return ref.orderBy('ticket', 'asc');
    });
  }

  ticketsRef: AngularFirestoreCollection<Ticket>;
  tickets: Observable<any[]>;

  ticketForm: FormGroup;


  ngOnInit() {

    this.ticketForm = new FormGroup({
      'ticket': new FormControl(),
      'used': new FormControl(false),
    });

    this.tickets = this.ticketsRef.snapshotChanges().pipe(map(change => {
      return change.map(a => {
        const tickets = a.payload.doc.data();
        tickets['id'] = a.payload.doc.id;
        return tickets;
      })
    }))
  }

  addNewTicket() {
    if (this.ticketForm.valid) {
      this.db.collection('tickets').add(this.ticketForm.value).then(() => {
        this.ticketForm.reset();
      });
    }
  }
  removeTicket(id) {
    this.db.collection<Ticket>('tickets').doc(id).delete();
  }
  update(ticket) {
    if (ticket.used == false) {
      ticket.used = true;
    } else if (ticket.used == true) {
      ticket.used = false;
    }

    this.db.collection<Ticket>('tickets').doc(ticket.id).update(ticket);
  }

}
