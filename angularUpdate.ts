import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'https://example.com/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, user);
  }

  logout(): void {
    // Logout logic here
  }

  isAuthenticated(): boolean {
    // Check authentication logic here
    return !!localStorage.getItem('token');
  }
}
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private docUrl = 'https://example.com/api/documents';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>(this.docUrl);
  }

  getDocument(id: string): Observable<any> {
    return this.http.get<any>(`${this.docUrl}/${id}`);
  }

  createDocument(document: any): Observable<any> {
    return this.http.post(this.docUrl, document);
  }

  updateDocument(id: string, document: any): Observable<any> {
    return this.http.put(`${this.docUrl}/${id}`, document);
  }

  deleteDocument(id: string): Observable<any> {
    return this.http.delete(`${this.docUrl}/${id}`);
  }
}
import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents: any[] = [];

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentService.getDocuments().subscribe(docs => this.documents = docs);
  }

  createDocument(): void {
    // Create document logic here
  }

  updateDocument(id: string): void {
    // Update document logic here
  }

  deleteDocument(id: string): void {
    this.documentService.deleteDocument(id).subscribe(() => {
      this.documents = this.documents.filter(doc => doc.id !== id);
    });
  }
}
