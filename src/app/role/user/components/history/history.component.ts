


import { Component, OnInit } from '@angular/core';

interface Application {
  id: number;
  type: string;
  date: string;
  status: string;
}

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  applications: Application[] = [
    { id: 12345, type: 'Fresh Application', date: '2024-06-01', status: 'Approved' },
    { id: 12346, type: 'Renewal', date: '2024-05-15', status: 'Pending' },
    // Add more applications as needed
  ];
  selectedApplication: Application | null = null;

  ngOnInit() {
    this.renderTable(this.applications);
  }

  getPendingApplications(applications: Application[]): Application[] {
    return applications;
  }

  renderTable(applications: Application[]) {
    const tbody = document.querySelector('#dataTable tbody') as HTMLElement;
    const noPendingApplicationsMessage = document.getElementById('no-pending-applications') as HTMLElement;
    tbody.innerHTML = '';
    if (applications.length > 0) {
      applications.forEach(application => {
        const row = `
          <tr>
            <td>${application.id}</td>
            <td>${application.type}</td>
            <td>${application.date}</td>
            <td>${application.status}</td>
            <td><button class="btn btn-info btn-sm" (click)="showModal(${application.id})">View Details</button></td>
          </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
      });
    } else {
      noPendingApplicationsMessage.style.display = 'block';
    }
  }

  showModal(id: number) {
    this.selectedApplication = this.applications.find(app => app.id === id) || null;
    if (this.selectedApplication) {
      // const modal = new bootstrap.Modal(document.getElementById('applicationDetailsModal')!);
      // modal.show();
    }
  }
}
