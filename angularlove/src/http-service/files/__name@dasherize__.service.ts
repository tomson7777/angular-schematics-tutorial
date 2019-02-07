import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const ENDPOINTS = {
  GET_<%= classify(name.toUpperCase()) %>: '',
};

@Injectable({providedIn: 'root'})
export class <%= classify(name) %>Service {

  constructor(private http: HttpClient) {}
  <% if (methods.includes('get')) { %>
  get<%= classify(capitalize(name)) %>(): Observable<<%= classify(capitalize(name)) %>[]> {
    return this.http.get<<%= classify(capitalize(name)) %>[]>(ENDPOINTS.GET_<%= classify(name.toUpperCase()) %>);
  }<% } %>
}
