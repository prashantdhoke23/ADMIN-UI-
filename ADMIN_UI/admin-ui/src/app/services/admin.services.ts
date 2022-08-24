import { Injectable } from '@angular/core';
import { AdminEntity } from '../entity/admin.entity';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';



import { throwError, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AdminService {

    getUrl = 'http://localhost:7779/admin/';
    deleteUrl = 'http://localhost:7779/admin/user/';
    postUrl = 'http://localhost:7779/admin/user';
    searchUrl = 'http://localhost:7779/admin/?name=';
    editUrl = 'http://localhost:7779/admin/user/';
    detail: any = {};

    constructor(private httpClient: HttpClient) {

    }

    setData(detail: any) {
        this.detail = detail;
    }

    getData(): any {
        return this.detail;
    }

    
    editAdmin(id: any, adminForms: any): Observable<any> {

        let httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'

            }),
        };


        return this.httpClient.put<any>(
            this.editUrl + id,
            JSON.stringify(adminForms),
            httpOptions
        ).pipe(
            catchError(this.handleError));
    }


    createNewAdmin(adminForms: any): Observable<any> {

        let httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'

            }),
        };


        return this.httpClient.post<any>(
            this.postUrl,
            JSON.stringify(adminForms),
            httpOptions
        ).pipe(
            catchError(this.handleError));
    }


    admin = [
        {
            name: 'raja',
            password: 'pass',
            email: 'raja@gmail.com',
            phNumber: 1234512345

        },
    ];

    // searchByCriteria(text: any): Observable<any> {

    //     let httpOptions = {
    //         headers: new HttpHeaders({
    //             'Access-Control-Allow-Origin': '*',
    //             'Content-Type': 'application/json'

    //         }),
    //     };

    //     return this.httpClient.get<any>(this.searchUrl + text, httpOptions);

    // }

    deleteByadminId(adminId: number): Observable<Boolean> {
        const headers = {

            'content-type': 'application/json',

            'Access-Control-Allow-Origin': '*',
        };

        return this.httpClient.delete<Boolean>(this.deleteUrl + adminId, {

            headers: headers

        }).pipe(
            catchError(this.handleError));
    }



    // addAdmins(adminObject: AdminEntity) {
    //     this.admin.push(adminObject);
    // }
    getAllAdmins(): Observable<any> {
        let httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
            }),
        };
        return this.httpClient.get<any>(this.getUrl, httpOptions)
            .pipe(
                catchError(this.handleError))


    }


    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }

    // errorHandler(error: HttpErrorResponse) {

    //     throwError(error.message || " Internal Server Error");
    // }
}



